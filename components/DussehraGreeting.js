import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, VolumeX, Volume2 } from 'lucide-react';

const AutoCurtainReveal = ({ children, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/Music/Jai Shree Ram Ringtone Download Mp3 - MobCup.Com.Co.mp3');
    audioRef.current.loop = true;
    audioRef.current.autoplay = true;
    audioRef.current.muted = false; // Ensure it's not muted by default

    const playAudio = () => {
      audioRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // If autoplay is prevented, we'll unmute and try again when the user interacts
        setIsMuted(true);
      });
    };

    const handleCanPlayThrough = () => {
      setIsAudioLoaded(true);
      playAudio();
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    // Attempt to play as soon as possible
    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      if (!audioRef.current.muted) {
        audioRef.current.play().catch(error => console.log('Audio playback failed:', error));
      }
    }
  };

  const closeModal = () => {
    setIsRevealed(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTimeout(onClose, 1000);
  };

  const curtainVariants = {
    closed: (i) => ({
      clipPath: i === 0 ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)',
    }),
    open: (i) => ({
      clipPath: i === 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.5,
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
 className="relative w-full max-w-3xl bg-blue-900 overflow-hidden"
          style={{ height: '80vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors z-30 p-2"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <button
            onClick={toggleMute}
            className="absolute bottom-2 right-2 text-white hover:text-gray-300 transition-colors z-30 p-2"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
          </button>
          <div className="relative z-10 p-8 h-full flex items-center justify-center">
            {children}
          </div>
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={curtainVariants}
              initial="closed"
              animate={isRevealed ? "open" : "closed"}
              className="absolute inset-0 bg-paper z-20"
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DussehraGreeting = ({ onClose }) => {
  return (
    <AutoCurtainReveal onClose={onClose}>
      <Image
        src="/images/Dussehra Instagram Post.png"
        alt="Happy Dussehra"
        width={1080}
        height={1080}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full h-full object-contain"
      />
    </AutoCurtainReveal>
  );
};

export default DussehraGreeting;
