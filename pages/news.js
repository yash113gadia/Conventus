'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/legacy/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConventusChatbot from '@/components/ConventusChatBot'
import FlipbookNewsletter from '@/components/FlipbookNewsletter'

// Photo gallery with hover effects
const PhotoGallery = () => {
  const images = [
    '/images/news_1.jpg',
    '/images/news_3.jpg',
    '/images/news_4.jpg',
    '/images/news_5.webp',
    '/images/news_6.webp',
    '/images/news_7.webp',
    '/images/niet_times_1.webp',
    '/images/niet_times_2.webp'
  ]

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
 className="relative overflow-hidden h-48 md:h-64"
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function NewsletterPage() {
  const pageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"])

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col bg-ink-100">
      <Header theme="red" />
      <motion.div
        style={{ y: headerY }}
        className="fixed top-20 left-0 right-0 z-10 bg-white/95 backdrop-blur border-b border-ink/15 py-8 shadow-sm"
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="eyebrow text-xs text-primary mb-2">The Press</p>
          <h1 className="font-serif-display text-4xl md:text-6xl font-semibold text-ink mb-3">
            Newsletters
          </h1>
          <span className="accent-rule mb-3" />
          <p className="text-xl text-primary font-semibold mb-1 mt-3">
            Conventus &amp; NIET Publications
          </p>
          <p className="text-lg text-ink-500 italic">
            Noida Institute of Engineering and Technology
          </p>
        </div>
      </motion.div>

      <main className="flex-grow container mx-auto px-4 py-8 mt-[calc(100vh-40vh)]">
        <div className="mb-12">
          <h2 className="font-serif-display text-3xl font-semibold text-ink mb-8 text-center">Latest Edition</h2>
          <FlipbookNewsletter
            title="NIET Times · Summer Edition 2026"
            imageUrl="/images/NIET_Times_2026S.jpg"
            pdfUrl="/pdfs/NIET-Times-2026-Even-Semester.pdf"
            showDownload={true}
            contentTitle="NIET Times, Summer 2026"
            description="The Jan–Jun 2026 edition of NIET Times records the academic achievements, student activities, creative work, and campus milestones that shaped the semester. Published by NIET and created with the Conventus editorial team, this issue brings the institute's latest stories together in one place."
            badge="Summer Edition 2026"
            displayDate="Jan–Jun 2026"
          />
        </div>

        <div className="mb-12">
          <h2 className="font-serif-display text-3xl font-semibold text-ink mb-8 text-center">Previous Editions</h2>
          <div className="mb-8">
            <FlipbookNewsletter
              title="CMUN 2.0 Newsletter"
              imageUrl="/images/mun2.0/newsletter-preview.jpg"
              pdfUrl="/pdfs/CMUN_2.0_Newsletter.pdf"
              showDownload={true}
            />
          </div>
        </div>

        <PhotoGallery />

        <ConventusChatbot />
      </main>

      <Footer />
    </div>
  )
}
