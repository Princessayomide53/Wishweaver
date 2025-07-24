import React, { useRef, useState } from 'react';
import celebration from '../assets/Celebration.jpg';
import Button from '../components/Common/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const GroupText = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !sender.trim()) {
      toast.error('Please enter your name and message.');
      return;
    }

    const readFileAsDataURL = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    let fileDataUrl: string | null = null;
    if (file) {
      try {
        fileDataUrl = await readFileAsDataURL(file);
      } catch (err) {
        toast.error('Failed to read file.');
        return;
      }
    }

    const newMessage = {
      from: sender.trim(),
      file: fileDataUrl,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    const existing = localStorage.getItem('groupMessageData');
    const parsed: any[] = existing ? JSON.parse(existing) : [];
    parsed.push(newMessage);

    localStorage.setItem('groupMessageData', JSON.stringify(parsed));
    toast.success('Message saved successfully! 🎉');
    setTimeout(() => {
      navigate('/view-cards');
    }, 2000);

    setMessage('');
    setSender('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* <Nav /> */}

      <section className='relative h-screen overflow-hidden'>
        <ToastContainer position='top-center' />
        <figure>
          <img
            src={celebration}
            alt='team-celebration'
            className='object-cover h-screen w-full'
          />
        </figure>
        <Link to='/' className='absolute top-4 left-4 md:top-6 md:left-6 z-30'>
          <BiArrowBack className='text-white text-4xl' />
        </Link>

        <article className='absolute inset-0 z-10 flex flex-col justify-center items-center pt-14 lg:pt-10'>
          <div className='p-4 md:p-8 m-3 md:m-0 md:w-[30rem] lg:w-[32rem] h-[32rem] md:h-[38.5rem] backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white'>
            <h2 className='text-center text-xl'>Group Celebration</h2>

            <p className='text-center text-xs md:text-base py-4'>
              A heartfelt moment where friends gather to celebrate someone
              special, sharing stories, laughter, and the joy of reconnecting.
            </p>

            <form
              className='space-y-3 md:space-y-6 mt-3'
              onSubmit={handleSubmit}
            >
              <div>
                <label className='block mb-1 text-xs md:text-sm text-white'>
                  Your Name
                </label>
                <input
                  type='text'
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder='e.g. John Doe'
                  className='w-full p-2 h-12 rounded bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70'
                  required
                />
              </div>

              <div>
                <label className='block mb-1 text-xs md:text-sm text-white'>
                  Upload Image, GIF or Audio (Optional)
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
                  required
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
