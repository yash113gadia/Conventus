# Image and gallery workflow

## Optimize images

Run this before committing newly added photographs:

```bash
npm run images:optimize
```

The optimizer processes JPEG, PNG, and WebP files under `public/`. It caps oversized images at 2400 pixels on their longest side, uses conservative quality settings for logos and text-heavy artwork, preserves QR codes, and only replaces a file when the result is smaller.

Required local tools: `cwebp`, `webpinfo`, `pngquant`, `sips`, and `jpegtran`.

## CMUN Connect gallery

The CMUN Connect gallery is managed directly in the repository:

1. Add photographs to `public/images/cmun-connect/`.
2. Use ordered names such as `01-opening.webp`, `02-disecc-session.webp`, and `03-closing.webp`.
3. Run `npm run images:optimize`.
4. Build and deploy the site.

`pages/cmun-connect.js` scans that folder during `getStaticProps`, accepts AVIF, JPEG, PNG, and WebP files, sorts filenames naturally, and creates the gallery without a separate image list. New photographs therefore require a new deployment.

This is not connected to Google Drive and there is no browser-based gallery uploader. Because every photograph is bundled into each deployment, keep uploads optimized and curated.

## Existing CMUN 2.0 gallery

The older CMUN 2.0 gallery is managed differently. Its image list and labels are hardcoded in `components/mun2.0gallery.js`, with a smaller curated list also used by `pages/media.js`. Adding or removing those images requires updating the corresponding arrays.
