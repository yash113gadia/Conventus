import { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import ConventusChatbot from '@/components/ConventusChatBot';
import SectionHeading from '@/components/SectionHeading';
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/HomePage.jpg', title: 'CONVENTUS Events', subtitle: 'Engage in Global Diplomacy' },
    { image: '/images/HomePage.jpg', title: 'Upcoming Conferences', subtitle: 'Join Our International Forums' },
    { image: '/images/HomePage.jpg', title: 'Workshops and Seminars', subtitle: 'Enhance Your Diplomatic Skills' },
     { image: '/images/HomePage.jpg', title: 'Past Events', subtitle: 'Lets Revive our Past Events' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[60vh] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src={slide.image} 
            alt={slide.title} 
            layout="fill" 
            style={{ objectFit: 'cover' }} 
          />
          <div className="absolute inset-0 bg-red-900 bg-opacity-70 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-xl">{slide.subtitle}</p>
          </div>
        </motion.div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-red-700 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

const EventCard = ({ image, title, date, description, onClick }) => (
  <motion.div
 className="bg-white overflow-hidden cursor-pointer flex h-104 border-2 border-red-200"
    onClick={onClick}
  >
    <div className="flex-1 p-8 flex flex-col justify-between">
      <div>
        <h3 className="text-red-800 text-3xl text-center font-semibold mb-3">{title}</h3>
        <p className="text-red-600 text-md text-center mb-3"><Calendar className="inline mr-2" size={16} />{date}</p>
        <p className="text-gray-700 text-md overflow-y-auto max-h-60 mb-3">{description}</p>
      </div>
      <button className="bg-red-600 text-white text-center px-4 py-1 rounded-lg hover:bg-red-700 transition text-lg self-center">
        Learn More
      </button>
    </div>
    <div className="relative h-auto w-2/5">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
  </motion.div>
);

const EventDetails = ({ event, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 bg-white z-50 overflow-y-auto p-4"
  >
    <div className="max-w-2xl mx-auto relative bg-red-50 p-6 rounded-lg border-2 border-red-200">
    <button
          className="absolute -top-1 right-0 text-red-600 hover:text-red-800"
          onClick={onClose}
        >
          <X size={32} />
        </button>
      <div className="text-center">
        <Image 
          src={event.image} 
          alt={event.title} 
          width={800} 
          height={400} 
          className="mx-auto mb-4 rounded-lg" 
        />
        <h2 className="text-3xl font-bold text-red-800 mb-2">{event.title}</h2>
        <p className="text-lg text-red-600 mb-4"><Calendar className="inline mr-2" size={18} />{event.date}</p>
        <p className="text-md text-gray-700 mb-4">{event.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Event Details</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Location: {event.location}</li>
          <li>Duration: {event.duration}</li>
          <li>Participants: {event.participants}</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to parse date strings and convert to Date objects for sorting
  const parseEventDate = (dateString) => {
    // Handle special case for "every month"
    if (dateString.toLowerCase() === "every month") {
      return new Date(); // Current date for ongoing events
    }
    
    // Convert to lowercase for case-insensitive parsing
    let normalizedDate = dateString.toLowerCase();
    
    // Handle date ranges (e.g., "January 19-21, 2024" -> take first date)
    normalizedDate = normalizedDate.replace(/(\d+)-\d+/, '$1');
    
    // Remove ordinal suffixes (st, nd, rd, th) from the date
    normalizedDate = normalizedDate.replace(/(\d+)(st|nd|rd|th)/, '$1');
    
    // Capitalize first letter of each word for proper Date parsing
    normalizedDate = normalizedDate.replace(/\b\w/g, char => char.toUpperCase());
    
    return new Date(normalizedDate);
  };

  const events = [
    { 
      image: "/images/pstevt_1.jpg", 
      title: "Sabhyta and Silicon",
      date: "September 8th, 2024",
      description: "The Sabhyta and Silicon event by Conventus held on September 8, 2024 during Padharo Mhare Desh, was a confluence of tradition and technology, highlighting the diverse culture and rich heritage of India under the theme Digital India. The event aimed to show how digital advancements are being used to preserve and promote Indian culture, providing participants with a platform to explore and present various aspects of Indian traditions in a modern context." ,
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "15 participants from Conventus and 500+ attendees"
    },
    { 
      image: "/images/pstevt_2.jpg", 
      title: "Breaking Barriers",
      date: "October 10th, 2024",
      description: "Breaking Barriers was an event organized by the Conventus Society during Jugnu - World Mental Health Day awareness by HID Club, with a special focus on speaking disorders. The event highlighted that Conventus values not only those who are fluent speakers but also those who face challenges, promoting inclusivity for all. Whether you're a confident speaker or aspire to improve, joining Conventus is open to everyone.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "9 partcipants from Conventus, 500+ attendees"
    },
    { 
      image: "/images/pstevt_3.jpg", 
      title: "Art Binneale Stroll",
      date: "March 16th, 2024",
      description: "On 16th March 2024, 1st-year students were treated to an enriching experience at the Red Fort for the Biennale Art Exhibition and Cultural Stroll. Organized with the aim of immersing participants in India's cultural tapestry, the event provided a platform for exploration, intellectual discourse, and personal growth. Through guided tours, art exhibitions, and interactive sessions, students had the opportunity to deepen their understanding of art, history, and global perspectives.",
      location: "Red Fort, Delhi",
      duration: "1 day",
      participants: "40+ participants"
    },
    { 
      image: "/images/pstevt_4.jpg", 
      title: "Sahitya Ajtak",
      date: "November 26th, 2023",
      description: "The objective of the Sahitya Aaj Tak visit was to immerse students in the rich literary heritage of India and enhance their understanding of Indian culture. By interacting with prominent figures in literature and indie authors, poets, buerocrats and journalists, students gained valuable insights and inspiration.",
      location: "Major Dhyanchand Stadium, Delhi",
      duration: "2 days",
      participants: "50+ participants from Conventus"
    },
    { 
      image: "/images/pstevt_5.jpg", 
      title: "AMIMUN",
      date: "January 19-21, 2024",
      description: "The Amity International Model United Nations, a simulation and educational model of the United Nations, provided students with an educational platform to learn about diplomacy and international relations. Delegates, representing countries, organisations, or individuals, engaged in negotiations, conducted pre-conference research, formulated position papers, and created policy proposals. The conference culminated in debating and voting on draft resolutions, with the objective of passing them through majority votes. Conventus members partcipated in various committees including UNHRC, AIPPM, UNCSW and IP.",
      location: "Amity University Noida",
      duration: "3 days",
      participants: "15 participants from Conventus"
    },
        { 
      image: "/images/pstevt_6.jpg", 
      title: "GLBMUN",
      date: "September 26-27, 2024",
      description: "The President and Vice Presidents of the Conventus Society—Manas Gupta, Yashraj Ranjan, and Pragya Singh—were invited to judge the UNSC and AIPPM committees at the GL Bajaj MUN. This recognition underscores their expertise, skills, and experience, while also reflecting their high regards and acceptance within the Greater Noida MUN circle.",
      location: "GLBITM, Greater Noida",
      duration: "2 days",
      participants: "3 judges from Conventus"
    },
    { 
      image: "/images/pstevt_7.jpg", 
      title: "Anchoring of Various Events",
      date: "every month",
      description: "Conventus is responsible for managing and hosting most major events at NIET, including their anchoring. Over 20 members of Conventus have had the opportunity to anchor and host various events. The society believes in providing chances to newcomers and a diverse group of individuals, rather than limiting opportunities to a select few. This approach not only enhances the speaking skills of its members but also helps them overcome stage fear while fostering inclusivity and variety.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "20+ from Conventus"
    },
       { 
      image: "/images/pstevt_8.jpg", 
      title: "Concord",
      date: "September 4th, 2024",
      description: "The CONCORD event, held on 4th September 2024, was a collaborative initiative between the Hope in Darkness Club and the Conventus Society, designed to inspire students to overcome self-doubt and foster self-confidence. The focal point of the event was a powerful speech delivered by A. Laxmi Manasa, a 2nd-year student from the ECE branch, who shared her personal journey from self-doubt to self-confidence, leaving a lasting impact on the audience.",
      location: "NIET, Greater Noida",
      duration: "5 days",
      participants: "3 participants from Conventus"
    },
        { 
      image: "/images/pstevt_9.jpg", 
      title: "World Food Day",
      date: "October 16th, 2023",
      description: "Grateful for the heartwarming success of our World Food Day feeding drive, made possible through the incredible collaboration with Conventus Society, Green Gold Society and Megapixels Club and with the support and guidance of FIAPO @fiapoindia. Special acknowledgement to every dedicated member who's been instrumental in feeding not just mouths but also sowing seeds of love. Together, we're nurturing our world one meal at a time. On World Food Day, October 16th, Green Gold Society teamed up with Conventus and Megapixels for a feeding drive at Jagat Farm Market, Greater Noida, and nearby areas. Let's feed animals, share the love, and raise awareness about our furry friends.",
      location: "Jagat Farm, Greater Noida",
      duration: "1 Day",
      participants: "24"
    },
        { 
      image: "/images/pstevt_10.jpg", 
      title: "Independence Day",
      date: "August 15th, 2024",
      description: "On the occasion of Independence Day, Vice President of The Conventus society, Yashraj Ranjan, delivered a heart-touching poem that celebrated India's glorious history. The poem took the audience on a journey through India's past, starting from the Indus Valley Civilization, through the era of Mahajanapadas and great empires, to the period of British rule. The poem also emphasized India's current stature as a global powerhouse, highlighting the country's booming economy, its role as the pharmacy of the world, advancements in the tech industry, and leadership in the spices industry. Yashraj urged everyone to remember the bravery of the unsung heroes whose legacy continues to inspire the nation",
      location: "NIET , Greater Noida",
      duration: "1 Day",
      participants: "2"
    },
    { 
      image: "/images/pstevt_11.jpg", 
      title: "Sanskriti 3.0",
      date: "April 10th, 2025",
      description: "Sanskriti 3.0 brought stories, emotions, and iconic characters to life on stage — an unforgettable celebration of cinema, creativity, and culture. With a crowd of 200+ and enthusiastic student participation, the event truly lived up to its 'Retro vs Bollywood' theme, leaving behind memories wrapped in music, lights, and applause.",
      location: "NIET, Greater Noida",
      duration: "1 day",
      participants: "200+ attendees with student participation"
    },
    { 
      image: "/images/pstevt_12.jpg", 
      title: "CMUN 2025",
      date: "March 22-23, 2025",
      description: "CMUN 2025 (MUN 2.0) was a comprehensive Model United Nations conference focused on Sustainable Development Goals (SDG). This offline debate program brought together delegates from various institutions to engage in diplomatic discussions and negotiations on critical global issues. The event emphasized the importance of sustainable development and international cooperation in addressing contemporary challenges.",
      location: "NIET, Greater Noida",
      duration: "2 days",
      participants: "180+ participants (Including OC + Delegates)"
    },
    { 
      image: "/images/pstevt_13.jpg", 
      title: "Voice & Verdict",
      date: "September 1-4, 2025",
      description: "Voice & Verdict: NIET's INTER BRANCH Debate Championship 2025 was a prestigious cultural debate competition that brought together students from all branches of NIET. The event was aligned with SDG Goals, encouraging participants to engage in meaningful discussions on sustainable development topics. This inter-branch championship provided a platform for students to showcase their debating skills, critical thinking, and knowledge of global issues while fostering healthy competition across different academic disciplines.",
      location: "NIET, Greater Noida",
      duration: "3 days (1pm to 3pm daily)",
      participants: "100+ participants (across all branches)"
    },
    { 
      image: "/images/pstevt_14.jpg", 
      title: "Jagmag - Diplomatic Cupcakes",
      date: "October 20th, 2024",
      description: "The \"Diplomatic Cupcakes\" stall, organized by the Conventus Society during the \"Jagmag\" event, aimed to raise awareness about the United Nations while providing an engaging and fun-filled experience for participants. Through interactive games and creative activities, the stall sought to educate attendees about global diplomacy and international cooperation.",
      location: "NIET, Greater Noida",
      duration: "360 minutes",
      participants: "1500 (13 from Conventus)"
    },
    { 
      image: "/images/pstevt_15.jpg", 
      title: "Basant Panchami",
      date: "February 2nd, 2025",
      description: "Basant Panchami (Saraswati Puja) celebrates the arrival of spring and is dedicated to Goddess Saraswati, the deity of wisdom, knowledge, and the arts. Conventus organized activities and prayers to seek blessings for learning and creativity. The event included cultural performances, music, and traditional observances that brought students and teachers together to celebrate knowledge and the arts.",
      location: "NIET, Greater Noida",
      duration: "150 minutes",
      participants: "3 students; Faculty: NA; External: 30"
    },
    { 
      image: "/images/pstevt_16.jpg", 
      title: "NSUT MUN 2025",
      date: "April 5-6, 2025",
      description: "NSUT Model United Nations 2025 was a two-day simulation of global diplomatic discussions conducted at NSUT, Dwarka on April 5 and 6, 2025. With over 700 delegates from across the country, the event served as a vibrant stage for passionate debates and intellectual discourse across diverse committees. Upholding the theme \"Diplomacy, Diversity, Dissent\", the conference emphasized the importance of respectful dialogue in resolving global challenges.",
      location: "NSUT, Dwarka, New Delhi",
      duration: "2880 minutes (2 days)",
      participants: "700+ (4 from NIET)"
    },
    { 
      image: "/images/pstevt_17.jpg", 
      title: "C’MUN Newsletter Release",
      date: "April 23rd, 2025",
      description: "Held on 23rd April 2025, the official release of the Conventus MUN 2025 Newsletter was a proud and ceremonious occasion, marking the culmination of months of planning, debate, and execution. The release was honored by the presence of dignitaries from NIET, including Dr. O. P. Agarwal (Managing Director), Dr. Neema Agrawal (Additional Managing Director), Dr. Vinod M. Kapse (Director, NIET), Dean Student Welfare Dr. Manish Kaushik, Associate DSW Ms. Kanika Jindal, and Faculty Coordinator Ms. Neeti Taneja.\n\nThe event commemorated the hard work of the International Press (IP) team who meticulously documented the event, capturing the vibrant energy, critical debates, and diplomatic exchanges that defined C’MUN 2025.",
      location: "A Block - NIET, Greater Noida",
      duration: "60 minutes",
      participants: "10 students; Faculty: 7"
    },
    {
      images: "/images/niet_times_2.webp",
      title: "NIET Times Release",
      date: "August 15th, 2025",
      description: "On 15th August 2025, the Conventus Club proudly launched NIET’s official bi-annual newsletter, NIET Times – Summer Edition. Released by the Board of Directors, this edition captures the vibrant spirit of the campus from January to June, highlighting key events, achievements, and student initiatives. Designed and curated by Conventus, the newsletter marks yet another milestone in celebrating and showcasing the dynamic essence of NIET through the semester.",
      location: "NIET , Greater Noida",
      duration: "1 Day",
      participants: ""
    },
    {
      images: "/images/pstevt_18.webp",
      title: "UPITS MUN 2025",
      date: "September 26th, 2025",
      description: "On 26th September 2025, the Conventus Club proudly participated in the Model United Nations (MUN) organized at the UP International Trade Show Expo (UPITS). Showcasing exceptional diplomacy, research, and public speaking skills, the delegates delivered an outstanding performance throughout the conference. Their hard work and dedication were recognized as the club bagged a total of six awards, including Best Delegate, High Commendation, Best Journalist, and Special Mention. This remarkable achievement highlighted the team’s excellence and strengthened Conventus Club’s reputation as a leading MUN society.",
      location: "India Expo Centre, Greater Noida",
      duration: "1 Day",
      participants: "100+ (8 from NIET)",
    },
  ];

  // Sort events by date from latest to oldest
  const sortedEvents = events.sort((a, b) => {
    const dateA = parseEventDate(a.date);
    const dateB = parseEventDate(b.date);
    return dateB - dateA; // Sort in descending order (latest first)
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="Our Legacy"
          title="Past Events"
          subtitle="A look back at the conferences, debates, and gatherings that shaped Conventus."
        />

        <div className="space-y-12">
          {sortedEvents.map((event, index) => (
            <EventCard 
              key={index}
              image={event.image}
              title={event.title}
              date={event.date}
              description={event.description}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
        <ConventusChatbot/>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedEvent && (
          <EventDetails 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
