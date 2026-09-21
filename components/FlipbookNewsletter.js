import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import Link from 'next/link';
import PDFViewer from './PDFViewer';

const FlipbookNewsletter = ({ 
  title, 
  imageUrl, 
  pdfUrl,
  showViewAll = false, 
  showDownload = false,
  contentTitle = 'Conference Highlights',
  description = 'At Conventus, our newsletter keeps readers informed and engaged with club updates, recent events, upcoming workshops, and opportunities to get involved. Each edition shares insights, celebrates member achievements, and captures the ideas shaping our community.',
  badge = 'CMUN 2.0 Edition',
  displayDate = 'March 2025',
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Set this to your actual page count
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
 <div className="max-w-6xl mx-auto bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[70%] p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-red-800 mb-4">{contentTitle}</h3>
          <p className="text-gray-700 mb-6">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setShowPreview(true)}
            >
              <FileText className="mr-2" size={20} />
              Preview Newsletter
            </motion.button>
            
            {showViewAll && (
              <Link href="/news">
                <motion.button
                  className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full flex items-center justify-center transition-colors"
                >
                  View All Newsletters
                </motion.button>
              </Link>
            )}
            
            {showDownload && (
              (() => {
                try {
                  const isAbsolute = /^(https?:)?\/\//i.test(pdfUrl);
                  const resolved = isAbsolute ? pdfUrl : encodeURI(pdfUrl);
                  // If external, open in new tab instead of forcing download (CORS/host restrictions)
                  return (
                    <a
                      href={resolved}
                      {...(isAbsolute ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
                      className="flex items-center justify-center bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full transition-colors"
                    >
                      <Download className="mr-2" size={20} />
                      {isAbsolute ? 'Open / Download' : 'Download PDF'}
                    </a>
                  )
                } catch (e) {
                  return null;
                }
              })()
            )}
          </div>
        </div>
        
        <div className="md:w-[30%] relative" style={{ minHeight: '400px' }}>
          <div className="relative h-full overflow-hidden cursor-pointer" onClick={() => setShowPreview(true)}>
            <div className="relative h-full w-full flex justify-center items-center">
              <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={560}
                className="object-contain h-auto max-h-[95%]"
              />
            </div>
            <div className="absolute inset-0 bg-ink/70 flex flex-col justify-end p-6">
              <div className="text-white">
                <p className="mb-2 text-sm font-medium bg-red-600 w-fit px-2 py-1 rounded-full">{badge}</p>
                <h3 className="text-2xl font-bold mb-2">{displayDate}</h3>
                <p className="mb-4 opacity-90">Click to view the full newsletter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PDFViewer
        pdfUrl={pdfUrl}
        title={title}
        currentPage={currentPage}
        totalPages={totalPages}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
};

export default FlipbookNewsletter;
