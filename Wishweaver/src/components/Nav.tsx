import React, { useEffect, useState } from 'react';
import Button from './Common/Button';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-white/10 shadow-md' : ''
      }`}
    >
      <div className='flex mx-auto justify-between w-full xl:max-w-[85rem] py-5 md:py-8 lg:max-w-[60rem] md:max-w-[45rem] px-3 md:px-0'>
        <h1 className='text-white font-bold text-2xl'>WishWeaver</h1>

        <nav className='xl:flex space-x-7 items-center hidden'>
          <ul className='flex space-x-10 text-white font-medium'>
            <li> Create </li>
            <li> Resources </li>
            <li> Features </li>
            <li> How it works </li>
            <li> Testimonial </li>
            <li> Pricing </li>
          </ul>

          <Button className='!bg-transparent rounded-full !py-2.5 !px-5 border-2 !mt-0 border-[#ff7f50]'>
            Weave your card
          </Button>

          <h2 className='text-white'>Sign in</h2>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
