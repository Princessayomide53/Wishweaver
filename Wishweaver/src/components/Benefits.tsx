import React from 'react';
import people from '../assets/people.jpg';
import thanks from '../assets/thanks.svg';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Button from './Common/Button';
import { motion, type Variants } from 'framer-motion';

const Benefits = () => {
  const textVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  const imageVariant: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
  };
  return (
    <section className='relative -mt-3 md:-mt-0'>
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
      <article className='md:h-[63rem] lg:h-[79rem] -mt-[17rem] bg-[#acdcff] py-5'>
        <div className='flex flex-col gap-7 md:gap-0 -mt-10 md:-mt-0 md:flex-row md:justify-around px-3 md:px-0 md:max-w-[45rem] lg:max-w-[60rem] xl:max-w-7xl mx-auto'>
          <div className=''>
            <motion.h3 className='text-2xl xl:text-4xl text-center md:text-left font-bold max-w-md text-[#0B0C0E]'>
              Businesses benefit from fostering team spirit and employee
              appreciation
            </motion.h3>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='md:text-sm lg:text-lg xl:text-xl font-normal md:max-w-[22rem] lg:w-[26rem] xl:w-[30rem] pt-7 md:pt-5 lg:pt-10 space-y-4 md:space-y-3 lg:space-y-6 md:px-2'
            >
              {[
                'Invite your co-workers and friends to contribute with just one tap.',
                'Save time by sending a single invitation to all your group chats and emails.',
                'Easily schedule multiple cards via an Excel upload.',
                'Personalize cards with your organization’s logo and team photos.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className='flex items-start gap-3'
                  variants={textVariant}
                  custom={i + 1}
                >
                  <IoIosCheckmarkCircleOutline className='text-[#ff7f50] font-bold mt-1 text-2xl' />
                  <span className='text-[#0B0C0E]'>{text}</span>
                </motion.p>
              ))}
            </motion.div>
            <Button className='!rounded-full !mt-6 !py-3 lg:!py-4 text-sm md:text-base'>
              Weave a Card
            </Button>
          </div>
          <motion.figure
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={imageVariant}
          >
            <img
              src={people}
              alt='people'
              className='object-contain md:max-w-[22rem] lg:max-w-md xl:max-w-2xl rounded-3xl md:mt-20 lg:mt-10 xl:mt-5'
            />
          </motion.figure>
        </div>

        <div className='flex flex-col-reverse md:flex-row gap-7 md:gap-10 lg:gap-0 lg:justify-around mt-16 md:mt-20 lg:mt-28 px-3 md:px-0 md:max-w-[45rem] lg:max-w-[60rem] xl:max-w-7xl mx-auto'>
          <motion.figure
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <img
              src={thanks}
              alt='thanks-card'
              className='object-cover w-auto md:h-[25rem] lg:h-[30rem] rounded-2xl'
            />
          </motion.figure>

          <div>
            <motion.h3
              className='text-2xl xl:text-4xl font-bold text-center md:text-left md:max-w-sm lg:max-w-md text-[#0B0C0E]'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={textVariant}
              custom={0}
            >
              Individuals Enjoy the Ease of Creating Personalized Cards that
              Strengthen Connections
            </motion.h3>
            <div className='md:text-sm lg:text-xl font-normal md:w-[19rem] lg:w-[30rem] pt-7 md:pt-5 lg:pt-10 space-y-4 lg:space-y-6 px-2'>
              {[
                'Upload unlimited messages and photos',
                'Display as a slideshow during events.',
                'Share easily with a unique online URL.',
                'Collect contributions for a meaningful cash gift.',
              ].map((texts, i) => (
                <motion.p
                  key={i}
                  className='flex items-start gap-3'
                  variants={textVariant}
                  custom={i + 1}
                >
                  <IoIosCheckmarkCircleOutline className='text-[#ff7f50] font-bold mt-1 text-2xl' />
                  <span className='text-[#0B0C0E]'>{texts}</span>
                </motion.p>
              ))}
            </div>
            <Button className='!rounded-full md:!py-3 lg:!py-4 !mt-6 text-sm md:text-base'>
              Weave a Card
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Benefits;
