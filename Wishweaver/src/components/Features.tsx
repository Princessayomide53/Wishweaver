import React from 'react';
import icon1 from '../assets/1.svg';
import icon2 from '../assets/2.svg';
import icon3 from '../assets/3.svg';
import icon4 from '../assets/4.svg';
import icon5 from '../assets/5.svg';
import icon6 from '../assets/6.svg';
import icon7 from '../assets/7.svg';
import icon8 from '../assets/8.svg';

const Features = () => {
  const Features = [
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
  return (
    <section className='my-24'>
      <h2 className='text-center text-5xl'>
        Make Every Occasion Extraordinary
      </h2>

      <p className='text-center text-xl py-3'>
        With WishWeaver’s standout features, it’s not just a card—it’s a
        heartfelt memory, created together for lasting impact
      </p>

      <article className='mt-7 grid grid-cols-4 gap-y-12 gap-x-7 max-w-7xl mx-auto'>
        {Features.map((cards) => (
          <div className='w-[18rem] h-[28rem] bg-red-200 rounded-2xl flex flex-col justify-center items-center'>
            <figure className='pb-3'>
              <img
                src={cards.img}
                alt={cards.title}
                className='object-cover w-auto h-auto'
              />
            </figure>

            <h5 className='font-semibold text-xl text-center px-7 py-3 text-[#0B0C0E]'>
              {cards.title}
            </h5>
            <p className='text-lg font-normal text-center px-5 text-[#0B0C0E]'>
              {cards.text}
            </p>
          </div>
        ))}{' '}
      </article>
    </section>
  );
};

export default Features;
