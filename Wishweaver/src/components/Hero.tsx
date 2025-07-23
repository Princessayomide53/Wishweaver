import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import { easeOut, motion, type Variants } from 'framer-motion';
import newyearVideo from '../assets/newyear.mp4';
import partyVideo from '../assets/party.mp4';
import teamVideo from '../assets/team.mp4';
import graduation from '../assets/Graduation.mp4';
import wedding from '../assets/wedding.mp4';
import Couple from '../assets/couples.mp4';

import anniversary from '../assets/anniversary.mp4';

const Hero = () => {
  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const videos = [
    { src: newyearVideo },
    { src: partyVideo },
    { src: graduation },
    { src: anniversary },
    { src: Couple },
    { src: teamVideo },
    { src: wedding },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cycle videos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // 10 seconds per video

    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideoIndex].src;
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((error) => console.error('Video playback failed:', error));
    }
  }, [currentVideoIndex]);
  return (
    <section className='relative min-h-screen flex flex-col items-center text-center text-white p-4 sm:p-8'>
      <div className='absolute inset-0 z-20'>
        <Nav />
      </div>

      <motion.video
        ref={videoRef}
        className='absolute inset-0 w-full h-full object-cover z-10'
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easeOut }}
      >
        <source src={videos[currentVideoIndex].src} type='video/mp4' />
      </motion.video>

      <div className='absolute inset-0 z-10' />

      {/* Hero Content */}
      <motion.div
        className='relative z-20 max-w-5xl mx-auto mt-40'
        initial='hidden'
        animate='visible'
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <motion.h1
          className='text-7xl sm:text-5xl font-bold mb-4'
          variants={heroVariants}
        >
          Make Every Apreciation <br />
          Special with a Group Card
        </motion.h1>
        <motion.p
          className='text-lg sm:text-xl py-7 mb-6 max-w-2xl mx-auto'
          variants={heroVariants}
        >
          For yourself or someone special with messages from multiple
          contributors
          <br />
          Upload photos, voice notes, videos and GIFs easily <br />
          Enjoy culturally and seasonally inspired card designs and occasions
          <br />
          Pool contributions for a cash gift (coming soon)
        </motion.p>
        <motion.a
          href='/create-template'
          className='inline-block mx-3 bg-[#ff7f50] text-white font-semibold cursor-pointer py-4 px-6 rounded-xl transition-transform duration-300 hover:scale-105'
        >
          Weave Your Card
        </motion.a>
        <motion.a className='inline-block mx-3 border-2 border-[#ff7f50] text-white cursor-pointer font-semibold py-4 px-6 rounded-xl transition-transform duration-300 hover:scale-105'>
          View Sample Card
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
