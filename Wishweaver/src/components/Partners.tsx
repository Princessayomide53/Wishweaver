import React, { useRef } from 'react';
import Logo1 from '../assets/logo1.svg';
import Logo2 from '../assets/logo2.svg';
import Logo3 from '../assets/logo3.svg';
import Logo4 from '../assets/logo4.svg';
import Logo5 from '../assets/logo5.svg';
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
    <div className='parallax overflow-hidden whitespace-nowrap w-full'>
      <motion.div className='scroller flex items-center' style={{ x }}>
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>{children}</React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Partners = () => {
  const logos = [Logo1, Logo2, Logo3, Logo4, Logo5];
  return (
    <section className='pt-[1.81rem] md:pt-[3.01rem] lg:pt-[2.41rem] bg-[#FCFCFC] shadow-md'>
      <h4 className='font-open text-[#021629] text-3xl md:text-4xl  font-bold text-center'>
        Trusted by these organizations to create unforgettable
        <br /> moments and connections
      </h4>
      <div className='py-[1.5rem] md:py-[2.95rem]'>
        <div className=''>
          <ParallaxText baseVelocity={2.5}>
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`client-logo-${index}`}
                className={`aspect-video h-14 xl:h-24  w-auto mx-4 md:h-auto `}
              />
            ))}
          </ParallaxText>
        </div>
      </div>
    </section>
  );
};

export default Partners;
