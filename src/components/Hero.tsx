'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import Nav from './Nav';
import { easeOut, motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: easeOut },
      },
    }),
    []
  );

  const containerVariants = useMemo(
    () => ({
      visible: { transition: { staggerChildren: 0.3 } },
    }),
    []
  );

  // Higher quality videos with faster loading optimizations
  const videos = useMemo(
    () => [
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373531/newyear_v1yn1a.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373531/newyear_v1yn1a.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373531/newyear_v1yn1a.jpg',
      },
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373457/party_ef2aik.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373457/party_ef2aik.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373457/party_ef2aik.jpg',
      },
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373467/Graduation_tfqexl.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373467/Graduation_tfqexl.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373467/Graduation_tfqexl.jpg',
      },
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373547/valentine_q0glre.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373547/valentine_q0glre.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373547/valentine_q0glre.jpg',
      },
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373433/couples_xbtxhq.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373433/couples_xbtxhq.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373433/couples_xbtxhq.jpg',
      },
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373501/team_r2obrj.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373501/team_r2obrj.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373501/team_r2obrj.jpg',
      },
      {
        mobile:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:good,w_720,f_auto,br_1500k/v1753373719/wedding_hhhskv.mp4',
        desktop:
          'https://res.cloudinary.com/dpng3tgio/video/upload/q_auto:best,w_1920,f_auto,br_3000k/v1753373719/wedding_hhhskv.mp4',
        poster:
          'https://res.cloudinary.com/dpng3tgio/video/upload/so_0,w_1920,h_1080,c_fill,f_webp,q_auto:best/v1753373719/wedding_hhhskv.jpg',
      },
    ],
    []
  );

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const preloadedVideos = useRef(new Set<number>());
  const videoCache = useRef(new Map<string, HTMLVideoElement>());

  // Detect mobile device
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Enhanced preload with caching
  const preloadVideo = useCallback(
    (index: number) => {
      if (preloadedVideos.current.has(index)) return;

      const currentVideo = videos[index];
      const videoSrc = isMobile ? currentVideo.mobile : currentVideo.desktop;

      // Check if already cached
      if (videoCache.current.has(videoSrc)) {
        preloadedVideos.current.add(index);
        return;
      }

      const video = document.createElement('video');
      video.src = videoSrc;
      video.preload = 'auto'; // Changed to 'auto' for faster loading
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';

      // Add to cache immediately
      videoCache.current.set(videoSrc, video);

      video.addEventListener('canplaythrough', () => {
        preloadedVideos.current.add(index);
      });

      video.addEventListener('error', () => {
        console.error(`Failed to preload video ${index}`);
        videoCache.current.delete(videoSrc);
      });

      video.load();
    },
    [videos, isMobile]
  );

  // Faster video transition
  const transitionToNextVideo = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextIndex = (currentVideoIndex + 1) % videos.length;

    // Preload next 2 videos aggressively
    const preloadIndex1 = (nextIndex + 1) % videos.length;
    const preloadIndex2 = (nextIndex + 2) % videos.length;
    preloadVideo(preloadIndex1);
    preloadVideo(preloadIndex2);

    setNextVideoIndex(nextIndex);

    // Faster transition
    setTimeout(() => {
      setCurrentVideoIndex(nextIndex);
      setIsTransitioning(false);
    }, 50); // Reduced from 100ms to 50ms
  }, [currentVideoIndex, videos.length, isTransitioning, preloadVideo]);

  // Video rotation effect
  useEffect(() => {
    const interval = setInterval(transitionToNextVideo, isMobile ? 7000 : 9000); // Slightly faster rotation
    return () => clearInterval(interval);
  }, [transitionToNextVideo, isMobile]);

  useEffect(() => {
    preloadVideo(0);
    preloadVideo(1);
    preloadVideo(2);
    preloadVideo(3);

    // Preload remaining videos after a short delay
    setTimeout(() => {
      for (let i = 4; i < videos.length; i++) {
        preloadVideo(i);
      }
    }, 100);
  }, [preloadVideo, videos.length]);

  const getCurrentVideoSrc = useCallback(
    (index: number) => {
      const video = videos[index];
      return isMobile ? video.mobile : video.desktop;
    },
    [videos, isMobile]
  );

  const currentVideo = videos[currentVideoIndex];
  const currentVideoSrc = getCurrentVideoSrc(currentVideoIndex);

  return (
    <section className='relative min-h-screen flex flex-col items-center text-center text-white overflow-hidden'>
      <div className='absolute inset-0 z-20'>
        <Nav />
      </div>

      <div className='absolute inset-0 bg-black'>
        {/* Current Video */}
        <motion.video
          key={`current-${currentVideoIndex}`}
          ref={currentVideoRef}
          className='absolute inset-0 w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          poster={currentVideo.poster}
          preload='auto'
          crossOrigin='anonymous'
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 0.5, ease: easeOut }} // Faster transition
        >
          <source src={currentVideoSrc} type='video/mp4' />
        </motion.video>

        {/* Next Video (for smooth transition) */}
        {isTransitioning && (
          <motion.video
            key={`next-${nextVideoIndex}`}
            ref={nextVideoRef}
            className='absolute inset-0 w-full h-full object-cover'
            autoPlay
            loop
            muted
            playsInline
            poster={videos[nextVideoIndex].poster}
            preload='auto'
            crossOrigin='anonymous'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easeOut }} // Faster transition
          >
            <source src={getCurrentVideoSrc(nextVideoIndex)} type='video/mp4' />
          </motion.video>
        )}
      </div>

      {/* Hero Content */}
      <motion.div
        className='relative flex flex-col items-center justify-center flex-1 px-4 py-20 max-w-5xl mx-auto'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <motion.h1
          className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight'
          variants={heroVariants}
        >
          Make Every Appreciation <br />
          Special with a Group Card
        </motion.h1>

        <motion.p
          className='text-sm sm:text-base md:text-lg lg:text-xl py-4 mb-6 max-w-3xl mx-auto leading-relaxed'
          variants={heroVariants}
        >
          For yourself or someone special with messages from multiple
          contributors
          <br className='hidden sm:block' />
          Upload photos, voice notes, videos and GIFs easily
          <br className='hidden sm:block' />
          Enjoy culturally and seasonally inspired card designs and occasions
          <br className='hidden sm:block' />
          Pool contributions for a cash gift (coming soon)
        </motion.p>

        <motion.div
          className='flex flex-col sm:flex-row gap-4 mt-4'
          variants={heroVariants}
        >
          <Link to='/create-template'>
            <button className='w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#ff7f50] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#ff6b35] text-sm md:text-base'>
              Weave Your Card
            </button>
          </Link>
          <Link to='/view-cards'>
            <button className='w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-[#ff7f50] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-opacity-20 text-sm md:text-base'>
              View Sample Card
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
