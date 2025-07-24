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
import newyearVideo from '../assets/newyear.mp4';

const loadVideo = async (videoName: string) => {
  switch (videoName) {
    case 'party':
      return (await import('../assets/party.mp4')).default;
    case 'graduation':
      return (await import('../assets/Graduation.mp4')).default;
    case 'anniversary':
      return (await import('../assets/anniversary.mp4')).default;
    case 'couples':
      return (await import('../assets/couples.mp4')).default;
    case 'team':
      return (await import('../assets/team.mp4')).default;
    case 'wedding':
      return (await import('../assets/wedding.mp4')).default;
    default:
      return null;
  }
};

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

  const initialVideos = useMemo(
    () => [
      { name: 'newyear', src: newyearVideo, loaded: true },
      { name: 'party', src: null, loaded: false },
      { name: 'graduation', src: null, loaded: false },
      { name: 'anniversary', src: null, loaded: false },
      { name: 'couples', src: null, loaded: false },
      { name: 'team', src: null, loaded: false },
      { name: 'wedding', src: null, loaded: false },
    ],
    []
  );

  const [videos, setVideos] = useState(initialVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedVideosRef = useRef(new Set(['newyear']));

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  const preloadVideo = useCallback(
    async (index: number) => {
      const video = videos[index];
      if (!video || video.loaded || loadedVideosRef.current.has(video.name)) {
        return;
      }

      try {
        setIsLoading(true);
        loadedVideosRef.current.add(video.name);

        const videoSrc = await loadVideo(video.name);

        if (videoSrc) {
          setVideos((prev) =>
            prev.map((v, i) =>
              i === index ? { ...v, src: videoSrc, loaded: true } : v
            )
          );
        }
      } catch (error) {
        console.error(`Failed to load video ${video.name}:`, error);
        loadedVideosRef.current.delete(video.name);
      } finally {
        setIsLoading(false);
      }
    },
    [videos]
  );

  // Video rotation with preloading
  const rotateVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % videos.length;

      // Preload the video after next
      const preloadIndex = (nextIndex + 1) % videos.length;
      if (!videos[preloadIndex].loaded) {
        preloadVideo(preloadIndex);
      }

      return nextIndex;
    });
  }, [videos.length, preloadVideo]);

  // Video rotation effect
  useEffect(() => {
    const interval = setInterval(rotateVideo, isMobile ? 8000 : 10000);
    return () => clearInterval(interval);
  }, [rotateVideo, isMobile]);

  // Preload second video on mount
  useEffect(() => {
    if (videos.length > 1 && !videos[1].loaded) {
      preloadVideo(1);
    }
  }, [preloadVideo, videos]);

  // Memoize current video
  const currentVideo = useMemo(
    () => videos[currentVideoIndex] || videos[0],
    [videos, currentVideoIndex]
  );

  // Memoize video props
  const videoProps = useMemo(
    () => ({
      className:
        'absolute inset-0 w-full h-full object-cover pointer-events-none',
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: isMobile ? ('metadata' as const) : ('auto' as const),
      onLoadStart: () => setIsLoading(true),
      onCanPlay: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    }),
    [isMobile]
  );

  return (
    <section className='relative h-[42rem] md:min-h-screen flex flex-col items-center text-center text-white p-4 sm:p-8'>
      <div className='absolute inset-0'>
        <Nav />
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className='absolute top-4 right-4 z-20'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white opacity-75'></div>
        </div>
      )}

      <motion.video
        key={currentVideo.src || currentVideo.name}
        ref={videoRef}
        {...videoProps}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easeOut }}
      >
        {currentVideo.src && <source src={currentVideo.src} type='video/mp4' />}
      </motion.video>

      {/* Hero Content */}
      <motion.div
        className='relative z-10 max-w-5xl mx-auto mt-40'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <motion.h1
          className='text-3xl md:text-5xl lg:text-7xl sm:text-5xl font-bold mb-4'
          variants={heroVariants}
        >
          Make Every Appreciation <br />
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
          <motion.button
            variants={heroVariants}
            className='inline-block mx-3 my-2 text-sm md:text-base px-4 bg-[#ff7f50] text-white font-semibold cursor-pointer py-3 md:py-4 md:px-6 rounded-xl transition-transform duration-300 hover:scale-105'
          >
            Weave Your Card
          </motion.button>
        </Link>
        <Link to='/group-template'>
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

export default React.memo(Hero);
