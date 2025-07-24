import React from 'react';
import { motion, type Variants } from 'framer-motion';
import t1 from '../assets/t1.svg';
import t2 from '../assets/t2.svg';
import t3 from '../assets/t3.svg';
import t4 from '../assets/t4.svg';
import t5 from '../assets/t5.svg';
import t6 from '../assets/t6.svg';
import t7 from '../assets/t7.svg';
import t8 from '../assets/t8.svg';
import t9 from '../assets/t9.svg';
import t10 from '../assets/t10.svg';
import Button from './Common/Button';

const templates = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];

const Template = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    }),
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.currentTarget.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    e.currentTarget.style.transition =
      'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)';
  };

  return (
    <section className='mt-14 md:mt-16 lg:mt-20 flex flex-col justify-center items-center'>
      <h2 className='text-[#0B0C0E] font-bold text-2xl md:text-3xl lg:text-4xl text-center'>
        What Occasion Are You Celebrating?
      </h2>
      <p className='text-center text-sm md:text-base lg:text-lg py-2 px-3 md:px-0'>
        Whether it's a birthday, a farewell, or a heartfelt thank you, select
        the perfect occasion
        <br className='hidden md:block' /> to get started and create a memorable
        card.
      </p>

      <article className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 px-3 md:px-0 md:max-w-[45rem] lg:max-w-[60rem] nav xl:max-w-[75rem] mx-auto gap-x-5 gap-y-8'>
        {templates.map((temp, index) => (
          <motion.div
            key={index}
            className='rounded-2xl border border-white overflow-hidden'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              willChange: 'transform',
              transition:
                'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
              height: '100%',
            }}
          >
            <figure>
              <img
                src={temp}
                alt='templates'
                className='object-cover w-full h-full'
              />
            </figure>
          </motion.div>
        ))}
      </article>
      <Button className='!rounded-full !py-3 md:!py-4 text-sm md:text-base !-mt-2 md:-mt-0'>
        Explore All Occasions
      </Button>
    </section>
  );
};

export default Template;
