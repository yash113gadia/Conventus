import React from 'react';
import Image from 'next/legacy/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '@/components/Header';
import Footer from '../components/Footer';
import JoinSection from '@/components/JoinSection';
import AboutPara from '@/components/aboutpara';
import ConventusChatbot from '@/components/ConventusChatBot';
import SectionHeading from '@/components/SectionHeading';

/* ---------------- Large banner (cinematic cross-fade carousel) ---------------- */
const BANNER_IMAGES = [
    '/images/pstevt_3.jpg',
    '/images/Secretariat.jpg',
    '/images/AB2.jpg',
    '/images/AB3.jpg',
    '/images/AB4.jpg',
    '/images/AB5.jpg',
    '/images/news_4.jpg',
];

const BannerCarousel = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        speed: 1200,
        autoplay: true,
        autoplaySpeed: 4500,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="absolute inset-0 z-0">
            <Slider {...settings}>
                {BANNER_IMAGES.map((img, i) => (
                    <div key={i}>
                        <div className="relative w-full h-[88vh] min-h-[600px]">
                            <Image src={img} alt="" layout="fill" objectFit="cover" priority={i === 0} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

/* ---------------- Monogram fallback for missing portraits ---------------- */
const Monogram = ({ name }) => {
    const initials = name
        .replace(/[^A-Za-z ]/g, '')
        .trim()
        .split(/\s+/)
        .slice(-2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
    return (
        <div className="absolute inset-0 bg-primary flex items-center justify-center">
            <span className="font-serif-display text-white text-5xl">{initials}</span>
        </div>
    );
};

/* ---------------- Dignitary / mentor message — alternating editorial row ---------------- */
const MessageRow = ({ name, position, image, info, flip, objectPosition = "center top" }) => (
    <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start py-12 border-b border-ink/10 last:border-b-0">
        <div className={`md:col-span-4 ${flip ? 'md:order-last' : ''}`}>
            <div className="relative w-full max-w-[18rem] mx-auto aspect-square overflow-hidden border border-ink/15 bg-ink-100">
                {image && image.trim() ? (
                    <Image src={image} alt={name} layout="fill" objectFit="cover" objectPosition={objectPosition} />
                ) : (
                    <Monogram name={name} />
                )}
            </div>
        </div>
        <div className="md:col-span-8">
            <p className="eyebrow text-[11px] text-primary mb-2">{position}</p>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-ink mb-5">{name}</h3>
            <p className="text-sm text-ink-600 leading-relaxed text-justify whitespace-pre-line">{info}</p>
        </div>
    </div>
);

/* ---------------- Student leader card ---------------- */
const LeaderCard = ({ name, position, image, info, objectPosition = "center top" }) => (
    <div className="bg-white border border-ink/15 flex flex-col">
        <div className="relative w-full aspect-square overflow-hidden border-b border-ink/15 bg-ink-100">
            <Image src={image} alt={name} layout="fill" objectFit="cover" objectPosition={objectPosition} />
        </div>
        <div className="p-7 flex flex-col flex-grow">
            <p className="eyebrow text-[11px] text-primary mb-2">{position}</p>
            <h3 className="font-serif-display text-2xl font-semibold text-ink mb-4">{name}</h3>
            <p className="text-xs text-ink-600 leading-relaxed text-justify">{info}</p>
        </div>
    </div>
);

/* ---------------- Small labelled sub-divider ---------------- */
const SubLabel = ({ children }) => (
    <div className="flex items-center justify-center gap-4 my-12">
        <span className="h-px w-10 bg-ink/20" />
        <span className="font-serif-display text-xl text-ink uppercase tracking-[0.2em]">{children}</span>
        <span className="h-px w-10 bg-ink/20" />
    </div>
);

export default function AboutPageOne() {
    const story = [
        "The Conventus Model United Nations Club is a student-centric body that provides a forum to engage with a transforming world. We combine adaptability with NIET's vision to build bridges between delegates from various backgrounds who share a passion for debate and dialogue. We aim to help delegates understand the fundamental workings of the United Nations, where diplomacy, debate, and global engagement come to life. At Conventus, we are driven by a passion for international affairs, leadership, and collaboration.",
        "Our mission is to cultivate a platform that nurtures critical thinking, problem-solving, and public speaking skills, empowering students to become global leaders. Whether you're a seasoned MUN enthusiast or new to diplomacy, our doors are always open. Conventus MUN offers more than just an extracurricular activity - it provides a transformative experience that prepares students for leadership roles both within and beyond academia. Looking to the future, we aim to establish ourselves as a renowned conference through active engagement in national and international MUN circuits.",
        "Our team is committed to promoting diplomacy, leadership, and global awareness through innovative events and impactful conferences. We strive to create a legacy of diplomats and leaders who are knowledgeable, compassionate, and ethical. With endless opportunities for learning and personal growth, Conventus is the perfect place for anyone who believes in the power of dialogue and action. Step into the world of diplomacy, engage with global issues, and be part of a community that builds bridges of understanding.",
    ];

    const management = [
        {
            name: "Dr. O.P Agarwal",
            position: "Managing Director",
            image: "/digni_img/MD Sir.JPG",
            info: "'Work is Worship' — Success is a continuous journey of learning and resilient improvement. Over the years, NIET has built a distinguished position in higher education by providing a student-centric environment where technical knowledge and holistic life skills go hand in hand. Our unique educational ecosystem equips you to face the real world with confidence. I invite each of you to join Conventus and NIET as we shape global leaders and ethical, successful individuals."
        },
        {
            name: "Dr. Neema Agarwal",
            position: "Additional Managing Director",
            image: "/digni_img/AMD Ma'am.JPG",
            info: "'Education is the most powerful weapon which you can use to change the world' — Nelson Mandela\n\nTo excel in today's dynamically changing corporate and social environments, students must become well-informed, courageous, and versatile leaders. At NIET, we bridge classroom academics with critical leadership skills, communication training, and practical corporate grooming. Our qualified faculty and robust co-curricular programs ensure that Conventus delegates and NIET students are fully prepared to tackle the global challenges of tomorrow."
        },
        {
            name: "Dr. Vinod M Kapse",
            position: "Director",
            image: "/digni_img/Director.JPG",
            info: "Welcome to NIET, Greater Noida. Since 2001, our mission has been to deliver top-tier education and ethical grooming to aspiring technocrats and leaders. Supported by world-class infrastructure and highly qualified faculty, we foster a healthy, vibrant learning environment that motivates students to dream big. We continuously strive to instil values of responsibility, quality, and excellence, preparing you to become impactful citizens and visionaries. I wish you the absolute best on your journey."
        },
    ];

    const mentors = [
        {
            name: "Dr. Manish Kaushik",
            position: "Dean Student Welfare",
            image: "/digni_img/Manish Sir.jpg",
            objectPosition: "center top",
            info: "Welfare of student is of utmost importance to us. The office of Dean Students' Welfare is responsible for all the aspects of students' welfare. The office therefore always motivates the students towards their bright future by engaging them in different academic as well as co-curricular activities so as to fulfill their dreams. The office strives to enhance the students' overall personality and to provide better career opportunities. The office looks after the functioning of various societies and clubs under which students take active participation."
        },
        {
            name: "Ms. Kanika Jindal",
            position: "Associate Dean Student Welfare",
            image: "/digni_img/Kanika Mam.jpg",
            objectPosition: "center top",
            info: "Is working as an Associate Dean Student Welfare and Assistant Professor in the Department of Electronics and Communication Engineering with experience of 13 years. She is graduated with honors in Electronics and Communication Engineering from Uttar Pradesh Technical University in 2010. She is Gold Medalist in M.Tech (VLSI Design) from Uttar Pradesh Technical University in 2012. She is young and dynamic in organizing cultural and technical events."
        },
        {
            name: "Deep Jyoti Roy",
            position: "Faculty Co-Ordinator",
            image: "",
            info: "As Faculty Coordinator of Conventus, Deep Jyoti Roy guides the club's academic direction and mentors students in debate, rhetoric, and diplomacy. The role bridges the society and the institution — shaping the conference calendar, preparing delegates for national and international MUN circuits, and ensuring every Conventus event upholds the standards of rigour and decorum the club is known for."
        },
    ];

    const leaders = [
        {
            name: "Deepanjali Sharma",
            position: "President",
            image: "/images/Deepanjali_Sharma.jpg",
            info: "As President of Conventus MUN Club, Deepanjali Sharma sets the direction of the society and ensures it remains a hub for diplomacy, debate, and leadership. She is committed to creating meaningful opportunities for members to explore international relations, sharpen their critical thinking, and develop as future leaders. Through her inclusive leadership, Deepanjali fosters collaboration and empowers members to bring their ideas forward, driving Conventus as a platform where dialogue inspires real impact."
        },
        {
            name: "Yash Gadia",
            position: "Vice President",
            image: "/images/yash-gadia.jpg",
            info: "As Vice President, Yash Gadia supports the council in strengthening the club’s initiatives and helping members grow personally and professionally. The role spans planning, execution, and the day-to-day work that keeps Conventus running, ensuring every event aligns with the club’s mission to promote dialogue, inclusivity, and global awareness."
        },
        {
            name: "Rachit Sai Sheelwant",
            position: "Vice President",
            image: "/images/Rachit_Sai_Sheelwant.jpg",
            info: "As Vice President, Rachit Sai Sheelwant works to build a space where students can engage with pressing global issues, practise diplomacy, and sharpen their leadership abilities. The role focuses on preparing delegates for committee, guiding new members through their first conferences, and upholding the standards of debate Conventus is known for."
        },
        {
            name: "Gauri Saxena",
            position: "Vice President",
            image: "/images/Gauri_Saxena.jpg",
            objectPosition: "center center",
            info: "As Vice President, Gauri Saxena is dedicated to fostering collaboration and innovation within the Conventus community, encouraging students to voice their perspectives on international affairs while building confidence and communication skills. Through this work, Conventus remains a dynamic environment where members grow into thoughtful, impactful leaders ready to engage with the world."
        },
    ];

    return (
        <div className="bg-paper">
            <Header />

            {/* 1 — Large banner hero */}
            <section className="relative h-[88vh] min-h-[600px] overflow-hidden text-white">
                <BannerCarousel />
                <div className="absolute inset-0 z-10 bg-ink/70" />
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="eyebrow text-xs text-white/70 mb-6">The Club</p>
                    <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight">
                        About Conventus
                    </h1>
                    <div className="flex justify-center mt-7">
                        <span className="double-rule" style={{ borderColor: '#ffffff' }} />
                    </div>
                    <p className="mt-8 text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        A student forum for diplomacy, debate, and global engagement at NIET, Greater Noida.
                    </p>
                </div>
            </section>

            {/* 2 — Our Story */}
            <section className="py-24 px-6 sm:px-8 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    <SectionHeading eyebrow="Who We Are" title="Our Story" align="left" />
                    <div className="space-y-6">
                        {story.map((p, i) => (
                            <p key={i} className="border-l-2 border-primary/40 pl-6 text-lg text-ink-700 leading-relaxed text-justify">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3 — Patrons, mentors & people */}
            <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white border-y border-ink/10">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Our People"
                        title="Meet Our Team"
                        subtitle="At the heart of Conventus MUN Club is a dedicated team of passionate, driven individuals who bring the club's vision to life — ensuring Conventus remains a space where students grow, connect, and make a difference."
                    />

                    <SubLabel>Management</SubLabel>
                    {management.map((m, i) => (
                        <MessageRow key={m.name} {...m} flip={i % 2 === 1} />
                    ))}

                    <SubLabel>Mentors</SubLabel>
                    {mentors.map((m, i) => (
                        <MessageRow key={m.name} {...m} flip={i % 2 === 1} />
                    ))}
                </div>
            </section>

            {/* 4 — Student leadership */}
            <section className="py-24 px-6 sm:px-8 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    <SectionHeading eyebrow="The Council" title="Student Leadership" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {leaders.map((l) => (
                            <LeaderCard key={l.name} {...l} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 5 — Principles & values */}
            <AboutPara />

            {/* 6 — Join */}
            <JoinSection />

            <Footer />
            <ConventusChatbot />
        </div>
    );
}
