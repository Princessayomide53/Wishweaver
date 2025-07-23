import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import perp from '../assets/perp.svg';
import meso from '../assets/meso.svg';
import quote from '../assets/quote.svg';
import benedict from '../assets/benedict.svg';

// -----------------------------
// Type-safe ParallaxText Props
// -----------------------------
interface ParallaxTextProps {
  children: ReactNode;
  baseVelocity?: number;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  baseVelocity = 100,
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className='parallax overflow-hidden w-full'>
      <motion.div className='scroller flex items-center' style={{ x }}>
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>{children}</React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const Testimonials = [
    {
      id: 1,
      quote: quote,
      img: meso,
      title: 'Lead Software Engineer - Next',
      name: 'Dili M',
      text: 'WishWeaver is just perfect for celebrating one another as teachers, educators and even for students! I can’t wait to bring WishWeaver to my school and educator circles to make appreciation more meaningful and effortless.',
    },
    {
      id: 2,
      quote: quote,
      img: perp,
      title: 'Co-founder - EarlyWages',
      name: 'Tiku N',
      text: 'From the moment I first heard about WishWeaver, I knew it was something special. Watching it grow from an idea into a fully developed platform has been inspiring.',
    },
    {
      id: 3,
      quote: quote,
      img: perp,
      title: 'Educator',
      name: 'Perp A',
      text: 'I can’t wait to use it for my family and friends. It’s such a thoughtful way to celebrate loved ones, and I know it will make every moment feel even more special!',
    },
    {
      id: 4,
      quote: quote,
      img: benedict,
      title: 'Lead Software Engineer - Next',
      name: 'Dili M',
      text: 'WishWeaver is just perfect for celebrating one another as teachers, educators and even for students! I can’t wait to bring WishWeaver to my school and educator circles to make appreciation more meaningful and effortless.',
    },
    {
      id: 5,
      quote: quote,
      img: meso,
      title: 'Lead Software Engineer - Next',
      name: 'Dili M',
      text: 'WishWeaver is just perfect for celebrating one another as teachers, educators and even for students! I can’t wait to bring WishWeaver to my school and educator circles to make appreciation more meaningful and effortless.',
    },
    {
      id: 6,
      quote: quote,
      img: perp,
      title: 'Lead Software Engineer - Next',
      name: 'Dili M',
      text: 'WishWeaver is just perfect for celebrating one another as teachers, educators and even for students! I can’t wait to bring WishWeaver to my school and educator circles to make appreciation more meaningful and effortless.',
    },
    {
      id: 7,
      quote: quote,
      img: benedict,
      title: 'Lead Software Engineer - Next',
      name: 'Dili M',
      text: 'WishWeaver is just perfect for celebrating one another as teachers, educators and even for students! I can’t wait to bring WishWeaver to my school and educator circles to make appreciation more meaningful and effortless.',
    },
  ];
  return (
    <section className='pt-[3rem] md:pt-[3.01rem] lg:pt-[2.41rem] xl:pt-[4.41rem]'>
      <h4 className='font-open text-[#021629] text-2xl md:text-4xl font-bold text-center'>
        What our customers are saying
      </h4>
      <p className='text-gray-500 text-center font-normal text-sm md:text-xl py-3'>
        Discover the unforgettable moments our customers have{' '}
        <br className='hidden md:block' />
        experienced with WishWeaver.
      </p>
      <div className='py-[1.5rem] md:py-[2.95rem] xl:py-[3.345rem]'>
        <div className=''>
          <ParallaxText baseVelocity={-0.2}>
            {Testimonials.map((test, index) => (
              <div
                key={index}
                className='bg-white w-[20rem] md:w-[30rem] p-5 md:p-7 mx-5 h-[15.7rem] md:h-[19.5rem] shadow-md border-[1px] border-[#acdcff] rounded-2xl'
              >
                <figure>
                  {' '}
                  <img
                    src={test.quote}
                    alt={`testimonial-${index}`}
                    className={`w-7 h-7 md:w-12 md:h-12`}
                  />
                </figure>
                <p className='font-normal my-3 flex !flex-wrap text-sm md:text-xl text-[#0B0C0E]'>
                  {test.text}
                </p>
                <div className='flex items-center gap-3'>
                  <figure>
                    <img
                      src={test.img}
                      alt={`testimonial-${index}`}
                      className={`w-12 h-12`}
                    />
                  </figure>
                  <p className='flex flex-col py-2'>
                    <b className='text-sm md:text-lg font-medium capitalize'>
                      {test.name}
                    </b>
                    <b className='text-sm md:text-base font-normal capitalize'>
                      {test.title}
                    </b>
                  </p>
                </div>
              </div>
            ))}
          </ParallaxText>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
