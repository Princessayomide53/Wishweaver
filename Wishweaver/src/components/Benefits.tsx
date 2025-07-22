import React from 'react';
import people from '../assets/people.jpg';
import thanks from '../assets/thanks.svg';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Button from './Common/Button';

const Benefits = () => {
  return (
    <section className='relative'>
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
      <article className='h-[79rem] -mt-[17rem] bg-[#acdcff] py-5'>
        <div className='flex justify-around'>
          <div className=''>
            <h3 className='text-4xl font-bold max-w-md text-[#0B0C0E]'>
              Businesses benefit from fostering team spirit and employee
              appreciation
            </h3>
            <p className='text-xl font-normal w-[30rem] pt-10 space-y-6 px-2'>
              {[
                'Invite your co-workers and friends to contribute with just one tap.',
                'Save time by sending a single invitation to all your group chats and emails.',
                'Easily schedule multiple cards via an Excel upload.',
                'Personalize cards with your organization’s logo and team photos.',
              ].map((text, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <IoIosCheckmarkCircleOutline className='text-[#ff7f50] font-bold mt-1 text-2xl' />
                  <span className='text-[#0B0C0E]'>{text}</span>
                </div>
              ))}
            </p>
            <Button className='!rounded-full'>Weave a Card</Button>
          </div>
          <figure>
            <img
              src={people}
              alt='people'
              className='object-contain max-w-2xl rounded-3xl mt-5'
            />
          </figure>
        </div>

        <div className='flex justify-around mt-28'>
          <figure>
            <img
              src={thanks}
              alt='thanks-card'
              className='object-cover w-auto h-[30rem]'
            />
          </figure>

          <div>
            <h3 className='text-4xl font-bold max-w-md text-[#0B0C0E] -mt-2'>
              Individuals Enjoy the Ease of Creating Personalized Cards that
              Strengthen Connections
            </h3>
            <p className='text-xl font-normal w-[30rem] pt-10 space-y-6 px-2'>
              {[
                'Upload unlimited messages and photos',
                'Display as a slideshow during events.',
                'Share easily with a unique online URL.',
                'Collect contributions for a meaningful cash gift.',
              ].map((text, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <IoIosCheckmarkCircleOutline className='text-[#ff7f50] font-bold mt-1 text-2xl' />
                  <span className='text-[#0B0C0E]'>{text}</span>
                </div>
              ))}
            </p>
            <Button className='!rounded-full'>Weave a Card</Button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Benefits;
