import React, { useRef, useState } from 'react';
import celebration from '../assets/Celebration.jpg';
import birthday from '../assets/birthday1.jpg';
import birthday2 from '../assets/birthday2.jpg';
import birthday3 from '../assets/birthday3.jpg';
import birthday4 from '../assets/birthday4.svg';
import birthday5 from '../assets/birthday5.jpg';
import t3 from '../assets/t3.svg';
import t8 from '../assets/t8.svg';
import t9 from '../assets/t9.svg';
import t10 from '../assets/t10.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ThreeDModel from '../components/ThreeDModel';
import Button from '../components/Common/Button';

type OccasionType = 'Birthday' | 'Graduation' | 'Customize';
const CreateTemplate = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const recipientRef = useRef<HTMLInputElement>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | ''>(
    ''
  );
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const options = ['Birthday', 'Graduation', 'Customize'];
  const templates = {
    Birthday: {
      minimal: birthday,
      festive: birthday5,
      floral: birthday4,
      modern: t3,
      interactive: birthday5,
    },
    Graduation: {
      classicCap: t8,
      achievementGlow: t9,
      elegantScroll: t10,
      boldFuture: t3,
      digitalCheers: birthday5,
    },
    Customize: {},
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOccasion) {
      toast.error('Please select an occasion');
      return;
    }

    if (selectedOccasion !== 'Customize' && !selectedTemplate) {
      toast.error('Please choose a template');
      return;
    }

    const name = nameRef.current?.value.trim();
    const recipient = recipientRef.current?.value.trim();
    const messageValue = selectedOccasion === 'Customize' ? message.trim() : '';

    if (!name || !recipient) {
      toast.error('Please fill in all required fields');
      return;
    }

    const dataToSave = {
      occasion: selectedOccasion,
      template: selectedTemplate,
      name,
      recipient,
      message: messageValue,
    };

    localStorage.setItem('wishCardData', JSON.stringify(dataToSave));
    toast.success('Card saved successfully! 🎉');

    setSelectedOccasion('');
    setSelectedTemplate('');
    if (nameRef.current) nameRef.current.value = '';
    if (recipientRef.current) recipientRef.current.value = '';
    setMessage('');
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
    <section className='flex overflow-hidden'>
      <ToastContainer position='top-center' />
      <article className='w-[45%] h-screen overflow-hidden relative'>
        <figure className='absolute inset-0 z-0'>
          <img
            src={celebration}
            alt='celebration'
            className='object-cover w-full h-full'
          />
        </figure>
        <div className='relative z-10 py-10 p-8 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white m-16'>
          <h2 className='text-3xl font-semibold mb-6'>Weave your Card</h2>
          <form onSubmit={handleSubmit} className='space-y-7'>
            <div>
              <select
                value={selectedOccasion}
                onChange={(e) => {
                  setSelectedOccasion(e.target.value as OccasionType);
                  setSelectedTemplate('');
                }}
                className='w-full p-2 h-12 focus:outline-blue-300 rounded bg-white/20'
              >
                <option value='' className='bg-white/20 text-black'>
                  Select an Occasion
                </option>
                {options.map((val, index) => (
                  <option
                    key={index}
                    value={val}
                    className='bg-white/20 text-black'
                  >
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-lg mb-1'>Your Name</label>
              <input
                ref={nameRef}
                className='w-full p-2 h-12 rounded bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70'
                placeholder='e.g. John Doe'
              />
            </div>
            <div>
              <label className='block text-lg mb-1'>
                Who is receiving this card?
              </label>
              <input
                ref={recipientRef}
                className='w-full p-2 rounded h-12 bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70'
                placeholder='e.g. Mom'
              />
            </div>
            <div>
              {selectedOccasion &&
                Object.keys(templates[selectedOccasion]).length > 0 && (
                  <div>
                    <label className='block text-lg mb-1'>
                      Choose a Design Template
                    </label>
                    <select
                      className='w-full p-2 h-12 focus:outline-blue-300 rounded bg-white/20 text-white'
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                      <option value='' className='bg-white/20 text-black'>
                        Select a Template
                      </option>
                      {Object.keys(templates[selectedOccasion]).map((key) => (
                        <option
                          key={key}
                          value={key}
                          className='bg-white/20 text-black'
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)} Template
                        </option>
                      ))}
                    </select>
                  </div>
                )}
            </div>

            {selectedOccasion === 'Customize' && (
              <div>
                <label className='block text-lg mb-1'>Message</label>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-full p-2 rounded h-12 bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70'
                  placeholder='Write something sweet...'
                />
              </div>
            )}

            <Button className='!rounded-full !-mt-0' type='submit'>
              Weave a card
            </Button>
          </form>
        </div>
      </article>

      {/* card preview */}
      <article className='w-[55%] h-screen pl-10'>
        <h3 className='text-center tracking-wider font-semibold py-10 text-4xl'>
          Preview Cards
        </h3>

        {selectedTemplate &&
          selectedOccasion &&
          selectedOccasion !== 'Customize' &&
          templates[selectedOccasion][
            selectedTemplate as keyof (typeof templates)[OccasionType]
          ] && (
            <figure
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                willChange: 'transform',
                transition:
                  'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
                // height: '100%',
              }}
              className='flex justify-center mr-10'
            >
              <img
                src={
                  templates[selectedOccasion as OccasionType][
                    selectedTemplate as keyof (typeof templates)[OccasionType]
                  ]
                }
                alt='Preview Template'
                className='w-auto h-[32rem] object-cover rounded-xl shadow-lg border border-[#acdcff]'
              />
            </figure>
          )}

        {selectedOccasion === 'Customize' && <ThreeDModel message={message} />}

        {!selectedTemplate && selectedOccasion !== 'Customize' && (
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[35rem] h-[28rem] bg-gray-200 border border-[#acdcff] rounded-2xl'></div>
            <p className='text-black text-center text-3xl pt-7'>
              No template selected yet
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default CreateTemplate;
