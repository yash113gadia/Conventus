import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SponsorsSection = () => {
    const sponsors = [
        {
            id: 1,
            name: "UNITEUP NGO",
            tier: "Social Impact",
            logo: "/images/unite_up.jpg"
        },
        {
            id: 2,
            name: "VISIONIAS ",
            tier: "Educational",
            logo: "/images/vision_ias.jpg"
        },
        {
            id: 3,
            name: "Dublieu",
            tier: "Outreach",
            logo: "/images/dublieu.png"
        }
    ];

    return (
        <section className="py-16 bg-paper ">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
                        Sponsors & Collaborators
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                    <p className="text-red-700 text-lg max-w-2xl mx-auto">
                        Join hands with leading organizations driving innovation and excellence
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-8 max-w-6xl mx-auto">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.id}
                            className="group relative flex flex-col items-center"
                        >
                            <div className="relative w-full aspect-square">
                                <div className="absolute inset-0 bg-white rounded-xl transform group- transition-all duration-300 p-4">
                                    <div className="w-full h-full bg-paper rounded-lg flex items-center justify-center border border-red-100 overflow-hidden">
                                        <div className="relative w-3/4 h-3/4">
                                            <Image
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="font-semibold text-red-800 group-hover:text-red-600 transition-colors duration-300">
                                    {sponsor.name}
                                </h3>
                                <span className="text-sm text-red-600 opacity-75">
                                    {sponsor.tier} Partner
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                
            </div>
        </section>
    );
};

export default SponsorsSection;
