import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, Globe2, Users2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConventusChatbot from '@/components/ConventusChatBot';

const committees = [
  { code: 'DISEC', name: 'Disarmament and International Security Committee' },
  { code: 'UNHRC', name: 'United Nations Human Rights Council' },
  { code: 'UNCSW', name: 'Commission on the Status of Women' },
  { code: 'AIPPM', name: 'All India Political Parties Meet' },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CMUNConnect({ galleryImages }) {
  return (
    <>
      <Head>
        <title>CMUN Connect | Conference Recap | Conventus MUN</title>
        <meta
          name="description"
          content="The official CMUN Connect conference recap, including the Secretariat's closing note, committee highlights, and event gallery."
        />
      </Head>

      <Header theme="red" />

      <main className="min-h-screen bg-paper text-ink pt-20 overflow-hidden">
        <section className="relative min-h-[70vh] flex items-center border-b border-accent/30 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/h1.jpg')" }}
          />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.035)_1px,_transparent_1px)] bg-[size:36px_36px]" />

          <motion.div
            className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold text-accent-300">
              <CheckCircle2 size={15} /> Session Concluded
            </span>
            <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight mt-7">
              CMUN Connect
            </h1>
            <p className="font-serif-display text-2xl sm:text-3xl italic text-accent-300 mt-4">
              Voices United Online
            </p>
            <div className="flex justify-center my-8">
              <span className="double-rule" style={{ borderColor: '#C8A04B' }} />
            </div>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
              The conference has officially concluded. This page now preserves the story of the session,
              its committees, and the moments that brought delegates together.
            </p>

            <div className="grid sm:grid-cols-3 gap-px mt-12 max-w-3xl mx-auto bg-white/15 border border-white/15 text-left">
              <div className="bg-ink/65 p-5 flex items-start gap-3">
                <Users2 className="text-accent-300 mt-0.5" size={19} />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/45">Forum</p>
                  <p className="font-semibold mt-1">4 Committees</p>
                </div>
              </div>
              <div className="bg-ink/65 p-5 flex items-start gap-3">
                <Globe2 className="text-accent-300 mt-0.5" size={19} />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/45">Format</p>
                  <p className="font-semibold mt-1">Online Conference</p>
                </div>
              </div>
              <div className="bg-ink/65 p-5 flex items-start gap-3">
                <CheckCircle2 className="text-accent-300 mt-0.5" size={19} />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/45">Status</p>
                  <p className="font-semibold mt-1">Session Adjourned</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-24 px-6 sm:px-8 lg:px-12">
          <motion.div
            className="max-w-4xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={reveal}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="eyebrow text-xs font-bold text-primary mb-4">Official Communiqué</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold leading-tight">
                A session worth remembering
              </h2>
              <div className="mt-7"><span className="accent-rule" /></div>
            </div>

            <div className="space-y-6 text-ink-700 text-lg leading-8">
              <p>
                CMUN Connect brought delegates together across four committee simulations for a focused
                exchange of ideas, research, negotiation, and diplomacy. Each room became a space for
                participants to test their perspective, listen closely, and work toward considered solutions.
              </p>
              <p>
                The Secretariat extends its sincere appreciation to every delegate, Executive Board member,
                organiser, and mentor who gave the conference its energy and purpose. The debates may have
                concluded, but the confidence, connections, and ideas shaped during the session continue beyond it.
              </p>
              <p className="border-l-2 border-primary pl-6 font-serif-display text-2xl text-ink italic">
                The gavel has fallen, and the dialogue carries forward.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white border-y border-ink/10">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="eyebrow text-xs font-bold text-primary mb-4">The Forums</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold">Committees in session</h2>
              <p className="mt-5 text-ink-600 leading-relaxed">
                Four distinct forums gave delegates room to examine security, rights, representation, and public policy.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
              {committees.map((committee, index) => (
                <motion.article
                  key={committee.code}
                  className="bg-paper p-7 sm:p-9"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <p className="font-serif-display text-3xl font-semibold text-primary">{committee.code}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{committee.name}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <p className="eyebrow text-xs font-bold text-primary mb-4">Conference Gallery</p>
                <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold">Moments from CMUN Connect</h2>
              </div>
              {galleryImages.length > 0 && (
                <p className="text-sm text-ink-500">{galleryImages.length} photographs</p>
              )}
            </div>

            {galleryImages.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <motion.figure
                    key={image.src}
                    className={`relative overflow-hidden bg-ink-100 ${index % 5 === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45 }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.figure>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-ink/25 bg-white px-6 py-20 text-center">
                <Camera className="mx-auto text-primary" size={42} strokeWidth={1.4} />
                <h3 className="font-serif-display text-3xl font-semibold mt-6">The official gallery is being prepared</h3>
                <p className="max-w-xl mx-auto mt-4 text-ink-600 leading-relaxed">
                  Photographs from CMUN Connect will be published here soon. Please check back as the
                  Secretariat completes the event archive.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <ConventusChatbot />
      <Footer />
    </>
  );
}

export function getStaticProps() {
  const galleryDirectory = path.join(process.cwd(), 'public', 'images', 'cmun-connect');
  const supportedImage = /\.(avif|jpe?g|png|webp)$/i;

  const galleryImages = fs.existsSync(galleryDirectory)
    ? fs.readdirSync(galleryDirectory)
        .filter((fileName) => supportedImage.test(fileName))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((fileName, index) => ({
          src: `/images/cmun-connect/${encodeURIComponent(fileName)}`,
          alt: `CMUN Connect conference highlight ${index + 1}`,
        }))
    : [];

  return { props: { galleryImages } };
}
