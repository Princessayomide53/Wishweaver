import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import { easeOut, motion, type Variants } from 'framer-motion';
import newyearVideo from '../assets/newyear.mp4';
import partyVideo from '../assets/party.mp4';
import teamVideo from '../assets/team.mp4';
import graduation from '../assets/Graduation.mp4';
import wedding from '../assets/wedding.mp4';
import Couple from '../assets/couples.mp4';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section className='relative h-[42rem] md:min-h-screen flex flex-col items-center text-center text-white p-4 sm:p-8'>
      <div className='absolute inset-0'>
        <Nav />
      </div>

      <motion.video
        key={videos[currentVideoIndex].src}
        ref={videoRef}
        className='absolute inset-0 w-full h-full object-cover pointer-events-none'
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

      {/* Hero Content */}
      <motion.div
        className='relative z-10 max-w-5xl mx-auto mt-40'
        initial='hidden'
        animate='visible'
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <motion.h1
          className='text-3xl md:text-5xl lg:text-7xl sm:text-5xl font-bold mb-4'
          variants={heroVariants}
        >
          Make Every Apreciation <br />
          Special with a Group Card
        </motion.h1>
        <motion.p
          className='text-xs md:text-sm lg:text-base xl:text-lg sm:text-xl py-7 mb-6 max-w-2xl mx-auto'
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
        <Link to='/create-template'>
          {' '}
          <motion.button
            variants={heroVariants}
            className='inline-block mx-3 my-2 text-sm md:text-base px-4 bg-[#ff7f50] text-white font-semibold cursor-pointer py-3 md:py-4 md:px-6 rounded-xl transition-transform duration-300 hover:scale-105'
          >
            Weave Your Card
          </motion.button>
        </Link>
        <Link to='/group-template'>
          {' '}
          <motion.button
            variants={heroVariants}
            className='inline-block mx-3 my-2 text-sm md:text-base px-4 border-2 border-[#ff7f50] text-white cursor-pointer font-semibold py-3 md:py-4 md:px-6 rounded-xl transition-transform duration-300 hover:scale-105'
          >
            View Sample Card
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
