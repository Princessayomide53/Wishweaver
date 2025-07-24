import React, { useRef, useState } from 'react';
import celebration from '../assets/Celebration.jpg';
import birthday from '../assets/birthday1.jpg';
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
import Nav from '../components/Nav';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

type OccasionType = 'Birthday' | 'Graduation' | 'Customize';
type Template = { name: string; src: string };
type ValidOccasion = Exclude<OccasionType, 'Customize'>;

type BirthdayTemplateKeys = 'minimal' | 'festive' | 'floral' | 'modern';
// | 'interactive';
type GraduationTemplateKeys =
  | 'classicCap'
  | 'achievementGlow'
  | 'elegantScroll'
  | 'boldFuture';
// | 'digitalCheers';

type Templates = {
  Birthday: Record<BirthdayTemplateKeys, Template>;
  Graduation: Record<GraduationTemplateKeys, Template>;
  Customize: Record<string, never>;
};

const templates: Templates = {
  Birthday: {
    minimal: { name: 'Minimal Template', src: birthday },
    festive: { name: 'Festive Template', src: birthday5 },
    floral: { name: 'Floral Template', src: birthday4 },
    modern: { name: 'Modern Template', src: t3 },
    // interactive: { name: 'Interactive Template', src: birthday5 },
  },
  Graduation: {
    classicCap: { name: 'Classic Cap', src: t8 },
    achievementGlow: { name: 'Achievement Glow', src: t9 },
    elegantScroll: { name: 'Elegant Scroll', src: t10 },
    boldFuture: { name: 'Bold Future', src: t3 },
    // digitalCheers: { name: 'Digital Cheers', src: birthday5 },
  },
  Customize: {},
};

const CreateTemplate = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const recipientRef = useRef<HTMLInputElement>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | ''>(
    ''
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [message, setMessage] = useState('');

  const options: OccasionType[] = ['Birthday', 'Graduation', 'Customize'];

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

    const selectedTemplateData =
      selectedOccasion !== 'Customize'
        ? (templates[selectedOccasion] as Record<string, Template>)[
            selectedTemplate
          ]
        : null;

    const dataToSave = {
      occasion: selectedOccasion,
      template: selectedTemplateData?.src || '',
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

  const getTemplateSrc = (): string | null => {
    if (
      selectedOccasion === 'Birthday' &&
      selectedTemplate in templates.Birthday
    ) {
      const templateKey = selectedTemplate as BirthdayTemplateKeys;
      return templates.Birthday[templateKey]?.src ?? null;
    }

    if (
      selectedOccasion === 'Graduation' &&
      selectedTemplate in templates.Graduation
    ) {
      const templateKey = selectedTemplate as GraduationTemplateKeys;
      return templates.Graduation[templateKey]?.src ?? null;
    }

    return null;
  };

  return (
    <>
      <section className='lg:flex h-screen overflow-hidden bg-cyan-900 '>
        <ToastContainer position='top-center' />
        <article className='md:w-full lg:w-[45%] h-screen overflow-hidden relative pt-20 lg:pt-20'>
          <figure className='absolute inset-0 z-0'>
            <img
              src={celebration}
              alt='celebration'
              className='object-cover w-full h-screen'
            />
          </figure>
          <Link
            to='/'
            className='absolute top-4 left-4 md:top-6 md:left-6 z-30'
          >
            <BiArrowBack className='text-white text-4xl' />
          </Link>
          <div className='relative z-10 py-5 md:py-7 p-3 md:p-8 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl text-white m-5 lg:pt-10 md:m-16'>
            <h2 className='text-xl md:text-3xl font-semibold mb-6'>
              Weave your Card
            </h2>
            <form onSubmit={handleSubmit} className='space-y-5 md:space-y-7'>
              <div>
                <select
                  value={selectedOccasion}
                  onChange={(e) => {
                    setSelectedOccasion(e.target.value as OccasionType);
                    setSelectedTemplate('');
                  }}
                  className='w-full p-2 h-12 focus:outline-blue-300 rounded bg-white/20'
                >
                  <option
                    value=''
                    className='bg-white/20 text-black md:text-base text-sm'
                  >
                    Select an Occasion
                  </option>
                  {options.map((val) => (
                    <option
                      key={val}
                      value={val}
                      className='bg-white/20 text-black'
                    >
                      {val}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm md:text-lg mb-1'>
                  Your Name
                </label>
                <input
                  ref={nameRef}
                  className='w-full p-2 h-12 rounded bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70'
                  placeholder='e.g. John Doe'
                />
              </div>

              <div>
                <label className='block text-sm md:text-lg mb-1'>
                  Who is receiving this card?
                </label>
                <input
                  ref={recipientRef}
                  className='w-full p-2 h-12 rounded bg-white/20 focus:outline-blue-300 text-white placeholder:text-white/70'
                  placeholder='e.g. Mom'
                />
              </div>

              {selectedOccasion &&
                Object.keys(templates[selectedOccasion]).length > 0 &&
                selectedOccasion !== 'Customize' && (
                  <div>
                    <label className='block text-sm md:text-lg mb-1'>
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
                      {Object.entries(
                        templates[selectedOccasion] as Record<string, Template>
                      ).map(([key, val]) => (
                        <option
                          key={key}
                          value={key}
                          className='bg-white/20 text-black'
                        >
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              {selectedOccasion === 'Customize' && (
                <div>
                  <label className='block text-sm md:text-lg mb-1'>
                    Message
                  </label>
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

        {/* Card Preview */}
        <article className='lg:w-[42%] xl:w-[48%] w-[55%] h-screen lg:ml-14 xl:ml-10 hidden lg:inline-block mt-20'>
          <h3 className='text-center tracking-wider font-semibold pt-10 pb-5 md:text-3xl text-white'>
            Preview Cards
          </h3>

          {getTemplateSrc() && (
            <figure
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className='flex justify-center mr-10'
              style={{
                willChange: 'transform',
                transition:
                  'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
              }}
            >
              <img
                src={getTemplateSrc()!}
                alt='Preview Template'
                className='w-auto h-[30rem] object-cover rounded-xl shadow-lg border border-[#acdcff]'
              />
            </figure>
          )}

          {selectedOccasion === 'Customize' && (
            <ThreeDModel message={message} />
          )}

          {!selectedTemplate && selectedOccasion !== 'Customize' && (
            <div className='flex flex-col justify-center items-center'>
              <div className='lg:w-[27rem] w-[35rem] h-[25rem] bg-gray-200 border border-[#acdcff] rounded-2xl'></div>
              <p className='text-white text-center text-3xl pt-7'>
                No template selected yet
              </p>
            </div>
          )}
        </article>
      </section>
    </>
  );
};

export default CreateTemplate;
