import React, { useEffect, useState } from 'react';
import Button from './Common/Button';
import { Twirl as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    'Create',
    'Resources',
    'Features',
    'How it works',
    'Testimonial',
    'Pricing',
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-white/10 shadow-md' : ''
      } ${nav && 'bg-[#0b0c0e]/90'}`}
    >
      <div
        className={`relative flex mx-auto z-20 justify-between w-full xl:max-w-[85rem] py-5 md:py-3 xl:py-8 lg:max-w-[60rem] md:max-w-[45rem] px-3 md:px-0`}
      >
        <h1 className='text-white font-bold text-2xl mt-2'>
          <Link to='/'>
            Wish <span className='text-[#ff7f50]'>Weaver</span>
          </Link>
        </h1>

        <nav className='xl:flex space-x-7 items-center hidden'>
          <ul className='flex space-x-10 text-white font-medium'>
            {navLinks.map((link, i) => (
              <li key={i}>{link}</li>
            ))}
          </ul>

          <Button className='!bg-transparent rounded-full !py-2.5 !px-5 border-2 !mt-0 border-[#ff7f50]'>
            Weave your card
          </Button>

          <h2 className='text-white'>Sign in</h2>
        </nav>

        {/* Mobile Hamburger */}
        <span className='xl:hidden'>
          <Hamburger
            direction='right'
            size={28}
            color='white'
            toggled={nav}
            toggle={() => setNav(!nav)}
          />
        </span>
      </div>

      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='xl:hidden bg-[#0b0c0e]/90 z-20 -mt-24 text-white px-6 py-6 h-screen space-y-6 backdrop-blur-lg shadow-lg'
          >
            <ul className='flex flex-col space-y-5 text-lg pt-28'>
              {navLinks.map((link, i) => (
                <li key={i} className='hover:text-[#ff7f50]'>
                  {link}
                </li>
              ))}
            </ul>

            <div className='flex flex-col gap-3 pt-6 md:pt-3'>
              <Button className='!bg-transparent rounded-full border-2 border-[#ff7f50] !text-white'>
                Weave your card
              </Button>
              <h2 className='text-white text-center'>Sign in</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
