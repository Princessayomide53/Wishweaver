import React from 'react';
import create from '../assets/create.svg';
import invite from '../assets/invite.svg';
import send from '../assets/send.svg';

const Works = () => {
  const Cards = [
    {
      id: 1,
      img: create,
      title: 'Weave a Card',
      text: 'Set up your group card in just minutes with over 500+ customizable designs.',
    },
    {
      id: 2,
      img: invite,
      title: 'Invite Others to Contribute',
      text: 'Invite friends, family, or colleagues to add personal messages, GIFs, photos, videos, audio, or cash.',
    },
    {
      id: 3,
      img: send,
      title: 'Send to the Recipient',
      text: 'Send your card when its ready. Print it as a keepsake, or display it as a slideshow at a live event.',
    },
  ];
  return (
    <section className='relative pb-20 w-full overflow-hidden'>
      {/* <svg
        width='100%'
        height='100%'
        id='svg'
        viewBox='0 0 1440 490'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        className='transition duration-300 ease-in-out delay-150 absolute inset-0 w-full -mt-[5rem]'
      >
        <defs>
          <linearGradient id='gradient' x1='2%' y1='37%' x2='98%' y2='63%'>
            <stop offset='0%' stopColor='#acdcff6b' />
            <stop offset='50%' stopColor='#acdcff33' />
            <stop offset='100%' stopColor='#acdcff1A' />
          </linearGradient>
        </defs>
        <path
          d='M 0,500 L 0,187 C ...'
          stroke='none'
          strokeWidth='0'
          fill='url(#gradient)'
          fillOpacity='1'
          className='path-0'
        />
      </svg> */}

      <svg
        width='100%'
        height='100%'
        id='svg'
        viewBox='0 0 1440 690'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        className='transition duration-300 ease-in-out w-full h-[500px] delay-150'
      >
        <path
          d='M 0,700 L 0,262 C 121.39285714285714,209.66071428571428 242.78571428571428,157.32142857142858 350,157 C 457.2142857142857,156.67857142857142 550.2499999999999,208.37499999999994 660,261 C 769.7500000000001,313.62500000000006 896.2142857142858,367.17857142857144 1029,405 C 1161.7857142857142,442.82142857142856 1300.892857142857,464.9107142857143 1440,487 L 1440,700 L 0,700 Z'
          stroke='none'
          stroke-width='0'
          fill='#acdcff'
          fill-opacity='1'
          className='transition-all duration-300 ease-in-out delay-150 path-0'
        ></path>
      </svg>
      <article className='flex flex-col items-center px-4 h-[44rem] -mt-[17rem] bg-[#acdcff] text-[#0B0C0E] py-5'>
        <h1 className='text-3xl md:text-5xl font-bold mb-4'>
          How Does WishWeaver Work?
        </h1>
        <p className='max-w-4xl text-base text-center md:text-lg'>
          Easily weave group cards, collect contributions, and deliver
          thoughtful messages with just a few clicks.
        </p>
        <div className='grid grid-cols-3 place-items-center pt-10 gap-24 max-w-7xl mx-auto'>
          {Cards.map((items) => (
            <div className=''>
              <figure>
                <img src={items.img} alt='How it works' />
              </figure>

              <h5 className=' text-[#0B0C0E] text-center text-xl font-semibold'>
                {items.title}
              </h5>
              <p className='text-lg max-w-64 mx-auto text-center'>
                {items.text}
              </p>
            </div>
          ))}
        </div>

        <button className='inline-block my-10  bg-[#ff7f50] text-white cursor-pointer font-semibold py-4 px-8 rounded-xl hover: transition-transform duration-300'>
          Weave a Card
        </button>
      </article>
    </section>
  );
};

export default Works;
