import React, { useRef, useState } from 'react';
import celebration from '../assets/Celebration.jpg';
import Button from '../components/Common/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav';

const GroupText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !message.trim()) {
      toast.error('Please upload a file and write a message.');
      return;
    }

    const data = {
      fileName: file.name,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('groupMessageData', JSON.stringify(data));
    toast.success('Message saved successfully! 🎉');

    setMessage('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Nav />
      <section className='relative h-screen overflow-hidden'>
        <ToastContainer position='top-center' />
        <figure>
          <img
            src={celebration}
            alt='team-celebration'
            className='object-cover h-screen w-full'
          />
        </figure>

        <article className='absolute inset-0 z-10 flex flex-col justify-center items-center pt-20 lg:pt-10'>
          <div className='p-4 md:p-8 m-3 md:m-0 md:w-[30rem] lg:w-[32rem] h-[35rem] md:h-[32rem] lg:h-[35rem] backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white'>
            <h2 className='text-center text-xl'>Group Celebration</h2>

            <p className='text-center text-xs md:text-base py-4'>
              A heartfelt moment where friends gather to celebrate someone
              special, sharing stories, laughter, and the joy of reconnecting.
            </p>

            <form className='space-y-6 mt-6' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-1 text-xs md:text-sm text-white'>
                  Upload Image, GIF or Audio
                </label>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*,audio/*'
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className='w-full file:bg-white/30 file:text-white file:border-none file:rounded file:px-4 file:py-2 text-sm md:text-base bg-white/20 rounded text-white placeholder:text-white/70 cursor-pointer'
                />
              </div>

              <div>
                <label className='block mb-1 text-xs md:text-base text-white'>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder='Write a sweet message...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-full p-3 rounded-xl bg-white/20 text-sm md:text-base focus:outline-blue-300 text-white placeholder:text-white/70 resize-none'
                ></textarea>
              </div>

              <Button type='submit' className='!rounded-full !-mt-2 !py-3'>
                Send Message
              </Button>
            </form>
          </div>
        </article>
      </section>
    </>
  );
};

export default GroupText;
