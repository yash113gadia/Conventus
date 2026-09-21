import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MOTTO = ['Negatio', 'Solutio', 'Actio'];

const Welcome = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActive((p) => (p + 1) % MOTTO.length), 2400);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden text-white">
            {/* Background image with a single flat ink wash */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/h1.jpg')" }}
            />
            <div className="absolute inset-0 z-10 bg-ink/75" />

            <div className="relative z-20 px-6 text-center max-w-3xl mx-auto">
                <p className="eyebrow text-[11px] sm:text-xs text-white/65 mb-6">
                    NIET&apos;s Model United Nations Society
                </p>

                <h1 className="font-serif-display text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-tight">
                    Conventus
                </h1>

                <div className="flex justify-center my-8">
                    <span className="double-rule" style={{ borderColor: '#ffffff' }} />
                </div>

                {/* Motto with a quiet active-word emphasis */}
                <div className="font-serif-display text-lg sm:text-2xl tracking-wide flex items-center justify-center gap-3 sm:gap-4">
                    {MOTTO.map((word, i) => (
                        <React.Fragment key={word}>
                            {i > 0 && <span className="text-white/25">/</span>}
                            <span className={`transition-colors duration-500 ${active === i ? 'text-white' : 'text-white/45'}`}>
                                {word}
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                <p className="mt-8 text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                    A forum for aspiring diplomats — debate, negotiation, and global discourse at NIET, Greater Noida.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/cmun-connect" className="btn-primary">View CMUN Connect</Link>
                    <Link href="/aboutus" className="btn-ghost-light">Explore the Society</Link>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
