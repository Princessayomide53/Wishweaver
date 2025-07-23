import React from 'react';
import celebration from '../assets/Celebration.jpg';
import Button from '../components/Common/Button';

const GroupText = () => {
  return (
    <section className='relative'>
      <figure>
        <img
          src={celebration}
          alt='team-celebration'
          className='object-cover h-screen w-full'
        />
      </figure>
      <article className='absolute inset-0 z-10 flex flex-col justify-center items-center'>
        <div className=' p-8 w-[32rem] h-[35rem] backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white'>
          <h2 className='text-center text-xl'>Group Celebration</h2>

          <p className='text-center py-4'>
            A heartfelt moment where friends, old and new, gather to celebrate
            someone special. It’s more than just a party, it’s shared stories,
            warm laughter, and the joy of reconnecting around a beautiful
            occasion.
          </p>

          <form className='space-y-6 mt-6'>
            <div>
              <label className='block mb-1 text-sm text-white'>
                Upload Image, GIF or Audio
              </label>
              <input
                type='file'
                accept='image/*,audio/*'
                className='w-full file:bg-white/30 file:text-white file:border-none file:rounded file:px-4 file:py-2 text-base bg-white/20 rounded text-white placeholder:text-white/70 cursor-pointer'
              />
            </div>

            <div>
              <label className='block mb-1 text-base text-white'>Message</label>
              <textarea
                rows={5}
                placeholder='Write a sweet message...'
                className='w-full p-3 rounded-xl bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70 resize-none'
              ></textarea>
            </div>

            <Button className='!rounded-full !-mt-2 !py-3'>Send Message</Button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default GroupText;
