#!/usr/bin/env bash

set -euo pipefail

image_root="${1:-public}"
max_dimension="${IMAGE_MAX_DIMENSION:-2400}"
photo_quality="${IMAGE_PHOTO_QUALITY:-80}"
sensitive_quality="${IMAGE_SENSITIVE_QUALITY:-90}"
optimization_threshold="${IMAGE_OPTIMIZATION_THRESHOLD:-614400}"
manifest_file="${IMAGE_OPTIMIZATION_MANIFEST:-scripts/image-optimization-manifest.txt}"

for tool in cwebp webpinfo pngquant sips jpegtran; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing required image tool: $tool" >&2
    exit 1
  fi
done

if [[ ! -d "$image_root" ]]; then
  echo "Image directory not found: $image_root" >&2
  exit 1
fi

file_size() {
  wc -c < "$1" | tr -d ' '
}

file_hash() {
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{ print $1 }'
  else
    sha256sum "$1" | awk '{ print $1 }'
  fi
}

write_manifest() {
  local temporary_manifest
  local file
  temporary_manifest=$(mktemp "${TMPDIR:-/tmp}/conventus-image-manifest.XXXXXX")

  while IFS= read -r -d '' file; do
    printf '%s\t%s\n' "$(file_hash "$file")" "$file" >> "$temporary_manifest"
  done < <(find "$image_root" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0)

  sort -t $'\t' -k2 "$temporary_manifest" > "${temporary_manifest}.sorted"
  mkdir -p "$(dirname "$manifest_file")"
  mv "${temporary_manifest}.sorted" "$manifest_file"
  rm -f "$temporary_manifest"
}

raster_total() {
  local total=0
  local file
  while IFS= read -r -d '' file; do
    total=$((total + $(file_size "$file")))
  done < <(find "$image_root" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0)
  echo "$total"
}

dimensions_for() {
  local file="$1"
  local extension="$2"
  local width
  local height

  if [[ "$extension" == "webp" ]]; then
    width=$(webpinfo "$file" 2>/dev/null | awk '/Width:/ { print $2; exit }')
    height=$(webpinfo "$file" 2>/dev/null | awk '/Height:/ { print $2; exit }')
  else
    width=$(sips -g pixelWidth "$file" 2>/dev/null | awk '/pixelWidth:/ { print $2; exit }')
    height=$(sips -g pixelHeight "$file" 2>/dev/null | awk '/pixelHeight:/ { print $2; exit }')
  fi

  echo "${width:-0} ${height:-0}"
}

before_bytes=$(raster_total)
optimized_count=0
skipped_count=0

if [[ "${IMAGE_RECORD_ONLY:-0}" == "1" ]]; then
  write_manifest
  echo "Recorded the current optimized image set in $manifest_file."
  exit 0
fi

while IFS= read -r -d '' file; do
  extension="${file##*.}"
  extension=$(printf '%s' "$extension" | tr '[:upper:]' '[:lower:]')
  original_bytes=$(file_size "$file")
  quality="$photo_quality"

  if [[ -f "$manifest_file" ]] && grep -Fqx "$(printf '%s\t%s' "$(file_hash "$file")" "$file")" "$manifest_file"; then
    skipped_count=$((skipped_count + 1))
    continue
  fi

  if [[ "$file" =~ (QR|qr|logo|Logo|NIET_Times|newsletter|Newsletter|certificate|Certificate) ]]; then
    quality="$sensitive_quality"
  fi

  read -r width height < <(dimensions_for "$file" "$extension")

  if (( width <= max_dimension && height <= max_dimension && original_bytes <= optimization_threshold )); then
    skipped_count=$((skipped_count + 1))
    continue
  fi

  temporary_base=$(mktemp "${TMPDIR:-/tmp}/conventus-image.XXXXXX")
  temporary_file="${temporary_base}.${extension}"
  rm -f "$temporary_base"

  case "$extension" in
    jpg|jpeg)
      if [[ "$file" =~ (QR|qr) ]]; then
        jpegtran -copy none -optimize -progressive -outfile "$temporary_file" "$file"
      elif (( width > max_dimension || height > max_dimension )); then
        sips -Z "$max_dimension" -s format jpeg -s formatOptions "$quality" "$file" --out "$temporary_file" >/dev/null
      else
        sips -s format jpeg -s formatOptions "$quality" "$file" --out "$temporary_file" >/dev/null
      fi
      ;;
    png)
      png_source="$file"
      resized_png=""
      if (( width > max_dimension || height > max_dimension )); then
        resized_png="${temporary_file}.resized.png"
        sips -Z "$max_dimension" "$file" --out "$resized_png" >/dev/null
        png_source="$resized_png"
      fi

      if [[ "$file" =~ (QR|qr) ]]; then
        pngquant --quality=95-100 --speed 1 --strip --force --output "$temporary_file" "$png_source" || cp "$png_source" "$temporary_file"
      else
        pngquant --quality="${quality}-100" --speed 1 --strip --force --output "$temporary_file" "$png_source" || cp "$png_source" "$temporary_file"
      fi
      [[ -z "$resized_png" ]] || rm -f "$resized_png"
      ;;
    webp)
      if (( width > max_dimension || height > max_dimension )); then
        if (( width >= height )); then
          cwebp -quiet -q "$quality" -alpha_q 100 -m 6 -mt -metadata none -resize "$max_dimension" 0 "$file" -o "$temporary_file"
        else
          cwebp -quiet -q "$quality" -alpha_q 100 -m 6 -mt -metadata none -resize 0 "$max_dimension" "$file" -o "$temporary_file"
        fi
      else
        cwebp -quiet -q "$quality" -alpha_q 100 -m 6 -mt -metadata none "$file" -o "$temporary_file"
      fi
      ;;
  esac

  optimized_bytes=$(file_size "$temporary_file")
  if (( optimized_bytes < original_bytes )); then
    chmod 644 "$temporary_file"
    mv "$temporary_file" "$file"
    optimized_count=$((optimized_count + 1))
  else
    rm -f "$temporary_file"
    skipped_count=$((skipped_count + 1))
  fi
done < <(find "$image_root" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0)

after_bytes=$(raster_total)
saved_bytes=$((before_bytes - after_bytes))
write_manifest

awk -v before="$before_bytes" -v after="$after_bytes" -v saved="$saved_bytes" \
  -v optimized="$optimized_count" -v skipped="$skipped_count" \
  'BEGIN {
    percentage = 0
    if (before > 0) percentage = (saved / before) * 100
    printf "Optimized %d images; kept %d originals that were already smaller.\n", optimized, skipped
    printf "Raster assets: %.2f MB -> %.2f MB (saved %.2f MB, %.1f%%).\n", before / 1048576, after / 1048576, saved / 1048576, percentage
  }'
