import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { ArrowRight } from 'lucide-react';

const LearnMoreSection = () => {
    const router = useRouter();

    const sections = [
        {
            title: "About Us",
            description: "Know more about our vision, mission, and the people behind Conventus.",
            image: "/images/h3.jpg",
            route: "/aboutus"
        },
        {
            title: "Model United Nations 2025",
            description: "Explore the second edition of Conventus MUN and its committees.",
            image: "/images/h5.jpg",
            route: "/mun2.0"
        },
        {
            title: "CMUN Connect",
            description: "Read the conference communiqué and revisit moments from the concluded session.",
            image: "/images/h4.jpg",
            route: "/cmun-connect"
        }
    ];

    return (
        <section className="py-24 bg-paper border-t border-ink/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-14">
                    <p className="eyebrow text-xs text-primary mb-3">Discover</p>
                    <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold text-ink">Learn More</h2>
                    <div className="flex justify-center mt-6"><span className="accent-rule" /></div>
                </div>

                <div className="grid md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            onClick={() => router.push(section.route)}
                            className="group text-left bg-paper flex flex-col transition-colors duration-200 hover:bg-white"
                        >
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image src={section.image} alt={section.title} layout="fill" objectFit="cover" />
                            </div>
                            <div className="p-7 flex flex-col flex-grow border-t border-ink/10">
                                <h3 className="font-serif-display text-2xl font-semibold text-ink mb-3">{section.title}</h3>
                                <p className="text-ink-700 leading-relaxed flex-grow">{section.description}</p>
                                <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
                                    Learn more
                                    <ArrowRight size={14} />
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearnMoreSection;
