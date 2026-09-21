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
    { image: '/images/HomePage.jpg', title: 'Upcoming Conferences', subtitle: 'Join Our International Forums' },
    { image: '/images/HomePage.jpg', title: 'Workshops and Seminars', subtitle: 'Enhance Your Diplomatic Skills' },
    { image: '/images/HomePage.jpg', title: 'Past Events', subtitle: 'Lets Revive our Past Events' },
    { image: '/images/HomePage.jpg', title: 'CONVENTUS Events', subtitle: 'Engage in Global Diplomacy' },
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

const EmptyState = () => (
  <div className="max-w-3xl mx-auto">
    <div className="bg-white rounded-xl border border-red-200 p-10 text-center">
      <div className="flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-red-800 mb-2">Coming soon</h2>
      <p className="text-lg text-red-600 mb-6">We're preparing our next event — details will be announced here shortly. Check back soon or follow our socials for updates.</p>
      <div className="flex justify-center">
        <a className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition" href="/">Back to home</a>
      </div>
    </div>
  </div>
);

const EventDetails = ({ event, onClose }) => {
  return (

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
          <h2 className="text-4xl font-bold text-red-800 mb-2">{event.title}</h2>
          <p className="text-lg text-red-600 mb-4"><Calendar className="inline mr-2" size={18} />{event.date}</p>
          <p className="text-md text-gray-700 mb-4">{event.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-red-800 mb-2">Event Details</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Location: {event.location}</li>
            <li>Duration: {event.duration}</li>
            {/* <li>Participants: {event.participants}</li> */}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
  ];


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <HeroCarousel />
      <main className="flex-grow container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="What's Next"
          title="Upcoming Events"
          subtitle="Discover and participate in our events addressing crucial international issues."
        />

        <div className="space-y-12">
          {events.length === 0 ? (
            <EmptyState />
          ) : (
            events.map((event, index) => (
              <EventCard
                key={index}
                image={event.image}
                title={event.title}
                date={event.date}
                description={event.description}
                onClick={() => setSelectedEvent(event)}
              />
            ))
          )}
        </div>
        <ConventusChatbot />
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
