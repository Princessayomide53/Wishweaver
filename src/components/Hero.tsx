import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import { easeOut, motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373531/newyear_v1yn1a.mp4',
    },
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373457/party_ef2aik.mp4',
    },
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373467/Graduation_tfqexl.mp4',
    },
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373547/valentine_q0glre.mp4',
    },
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373433/couples_xbtxhq.mp4',
    },
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373501/team_r2obrj.mp4',
    },
    {
      src: 'https://res.cloudinary.com/dpng3tgio/video/upload/v1753373719/wedding_hhhskv.mp4',
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000);

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
    <section className='relative h-[42rem] md:min-h-screen flex flex-col items-center text-center text-white p-4 sm:p-8'>
      <div className='absolute inset-0'>
        <Nav />
      </div>

      <motion.video
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
