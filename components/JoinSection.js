import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const JoinSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white border-t border-ink/10">
            <div className="max-w-5xl mx-auto">
                <div className="bg-ink-50 border border-ink/10 rounded-2xl overflow-hidden shadow-xl grid md:grid-cols-12 items-stretch min-h-[400px]">
                    {/* Left Column - Perfectly Centered Image (No Stretching!) */}
                    <div className="relative md:col-span-5 min-h-[320px] md:min-h-full bg-ink-100">
                        <Image
                            src="/images/gs.jpg"
                            alt="Conventus Society Members"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink-950/10 pointer-events-none" />
                    </div>

                    {/* Right Column - Premium Editorial Copy & Button */}
                    <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start text-left bg-gradient-to-br from-paper to-white">
                        <p className="eyebrow text-xs text-primary mb-3">Conference Archive</p>
                        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-ink mb-4 leading-tight">
                            Revisit CMUN Connect
                        </h2>
                        
                        <div className="w-12 h-px bg-primary/40 mb-6" />
                        
                        <p className="text-ink-600 text-sm sm:text-base leading-relaxed mb-8 text-justify">
                            The session has concluded. Read the Secretariat&apos;s closing note and revisit the committees and moments that shaped CMUN Connect.
                        </p>

                        <div className="relative w-full">
                            <Link
                                href="/cmun-connect"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-primary/20"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                View the Conference
                                <ArrowRight size={18} />
                            </Link>
                            
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.p
                                        className="absolute top-16 left-0 text-xs text-ink-500 mt-2"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                    >
                                        Open the CMUN Connect conference archive.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinSection;
