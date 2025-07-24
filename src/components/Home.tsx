import React from 'react';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Frequent from '../components/Frequent';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Testimonials from '../components/Testimonials';
import Works from '../components/Works';
import Template from './Template';

const Home = () => {
  return (
    <main>
      <Hero />
      <Partners />
      <Features />
      <Works />
      <Template />
      <Benefits />
      <Testimonials />
      <Frequent />
      <Footer />
    </main>
  );
};

export default Home;
