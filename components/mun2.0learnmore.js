import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { ArrowRight } from 'lucide-react';

const LearnMoreSection = () => {
    const router = useRouter();

    const sections = [
        {
            title: "About Us",
            description: "Know more about our vision and mission",
            image: "/images/h3.jpg",
            route: "/aboutus"
        },
        {
            title: "Committees",
            description: "Explore our diverse range of committees",
            image: "/images/h5.jpg",
            route: "/commnew"
        },
        {
            title: "CMUN Connect",
            description: "Read the conference communiqué and explore the completed event.",
            image: "/images/h4.jpg",
            route: "/cmun-connect"
        }
    ];

    return (
        <section className="py-24 bg-ink-100">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-14">
                    <p className="eyebrow text-xs text-primary mb-3">Good to Know</p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold text-ink">What You Might Want to Know</h2>
                    <div className="flex justify-center mt-5"><span className="accent-rule" /></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <motion.button
                            key={index}
                            onClick={() => router.push(section.route)}
 className="group text-left bg-white overflow-hidden shadow-sm ring-1 ring-ink/5 flex flex-col transition-all duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="relative h-60 w-full overflow-hidden">
                                <div className="absolute inset-0 transition-transform duration-500 group-">
                                    <Image src={section.image} alt={section.title} layout="fill" objectFit="cover" />
                                </div>
                                <div className="absolute inset-0" />
                            </div>
                            <div className="p-7 flex flex-col flex-grow">
                                <h3 className="font-serif-display text-2xl font-semibold text-ink mb-3">{section.title}</h3>
                                <p className="text-ink-500 leading-relaxed flex-grow">{section.description}</p>
                                <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm">
                                    Learn more
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearnMoreSection;
