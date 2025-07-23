import React from 'react';
import { motion, type Variants } from 'framer-motion';
import icon1 from '../assets/1.svg';
import icon2 from '../assets/2.svg';
import icon3 from '../assets/3.svg';
import icon4 from '../assets/4.svg';
import icon5 from '../assets/5.svg';
import icon6 from '../assets/6.svg';
import icon7 from '../assets/7.svg';
import icon8 from '../assets/8.svg';

const Features = () => {
  const features = [
    {
      id: 1,
      img: icon1,
      title: 'For Any Occasion',
      text: 'From birthdays and work anniversaries to team milestones, WishWeaver has you covered.',
    },
    {
      id: 2,
      img: icon2,
      title: 'Collaborative Contributions',
      text: 'Invite others to add their personal touch with text, photos, voice notes, GIFs, and videos',
    },
    {
      id: 3,
      img: icon3,
      title: 'Money Collection (Coming soon)',
      text: 'Easily collect contributions to add a thoughtful cash gift.',
    },
    {
      id: 4,
      img: icon4,
      title: 'Real-Time Updates',
      text: 'Watch your card come to life as contributions roll in.',
    },
    {
      id: 5,
      img: icon5,
      title: 'Hassle-Free Management',
      text: 'Effortlessly track contributions, tweak the design, and manage invitee details.',
    },
    {
      id: 6,
      img: icon6,
      title: '500+ Custom Card Design Templates',
      text: 'Choose from over 500 customizable templates to match the occasion perfectly.',
    },
    {
      id: 7,
      img: icon7,
      title: 'Easy Sharing Options',
      text: 'Schedule or instantly share via email, messaging apps, or download for printing.',
    },
    {
      id: 8,
      img: icon8,
      title: 'Safe, Secure, and Private',
      text: 'Your messages and media are safely stored and accessible only to you and those you invite.',
    },
  ];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className='mt-12 md:mt-16 lg:mt-20 md:mb-7 lg:mb-10'>
      <h2 className='text-center text-2xl md:text-3xl lg:text-5xl'>
        Make Every Occasion Extraordinary
      </h2>

      <p className='text-center text-sm lg:text-xl py-3 px-3 md:px-0'>
        With WishWeaver’s standout features, it’s not just a card. it’s a
        <br className='hidden md:block' />
        heartfelt memory, created together for lasting impact
      </p>

      <article className='mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 md:gap-x-7 max-w-[18rem] md:max-w-[45rem] lg:max-w-[60rem] xl:max-w-7xl mx-auto'>
        {features.map((card, index) => (
          <motion.div
            key={card.id}
            className={`w-full md:w-[19rem] h-[28rem] rounded-2xl flex flex-col justify-center items-center px-4 py-5 text-[#0B0C0E] border hover:scale-[1.02] transition-transform duration-300 shadow-sm
              ${
                index === 0 || index === 5
                  ? 'border-[rgba(172,220,255,0.8)] bg-[linear-gradient(101deg,rgba(172,220,255,0.26)_13.31%,rgba(172,220,255,0.1)_57.86%)] hover:border-[#4ab4ff]'
                  : index === 1
                  ? 'border-[rgba(255,175,163,0.8)] bg-[linear-gradient(101deg,rgba(255,175,163,0.26)_13.31%,rgba(255,175,163,0.1)_57.86%)] hover:border-[#ff6851]'
                  : index === 2 || index === 7
                  ? 'border-[rgba(237,208,255,0.8)] bg-[linear-gradient(101deg,rgba(218,157,255,0.26)_13.31%,rgba(218,157,255,0.1)_57.86%)] hover:border-[#be55ff]'
                  : index === 3 || index === 6
                  ? 'border-[rgba(166,247,193,0.8)] bg-[linear-gradient(101deg,rgba(166,247,193,0.26)_13.31%,rgba(166,247,193,0.1)_57.86%)] hover:border-[#0fa942]'
                  : index === 4
                  ? 'border-[rgba(255,222,124,0.8)] bg-[linear-gradient(101deg,rgba(255,222,124,0.26)_13.31%,rgba(255,222,124,0.1)_57.86%)] hover:border-[#ffca2c]'
                  : ''
              }
            `}
            custom={index}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <figure className='pb-3 cursor-pointer'>
              <img
                src={card.img}
                alt={card.title}
                className='object-cover w-auto h-auto'
              />
            </figure>

            <h5 className='font-semibold text-xl text-center px-7 py-3'>
              {card.title}
            </h5>
            <p className='md:text-lg text-base font-normal text-center px-5'>
              {card.text}
            </p>
          </motion.div>
        ))}
      </article>
    </section>
  );
};

export default Features;
