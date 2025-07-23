import React from 'react';
import footerBg from '../assets/footer.png';
import logo from '../assets/whiteweave.svg';
import { RiTwitterXFill, RiFacebookFill } from 'react-icons/ri';
import { IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';

const socialIcons = [
  { icon: <RiFacebookFill key='fb' /> },
  { icon: <RiTwitterXFill key='x' /> },
  { icon: <IoLogoInstagram key='ig' /> },
  { icon: <IoLogoLinkedin key='li' /> },
];

const footerLinks = [
  {
    title: 'Occasions',
    items: ['Birthdays', 'Japa', 'Work Promotion', 'Anniversary', 'Easter'],
  },
  {
    title: 'Policies',
    items: [
      'Privacy Policy',
      'Terms and Condition',
      'Cookie Policy',
      'Acceptable Use Policy',
    ],
  },
  {
    title: 'Resources',
    items: ['Enterprise', 'Become a Gratitude Champion', 'WishWeaver Calendar'],
  },
  {
    title: 'Company',
    items: ['Our Story', 'Blog', 'Contact Us', 'Support'],
    address:
      '🇺🇸 STE 26180, 1111B S Governors Avenue Dover, DE 19904 United States',

    address2: '🇳🇬 10, Hughes Avenue, Alagomeji, Yaba, Nigeria',
  },
];

const FooterSection = ({
  title,
  items,
  address,
  address2,
}: {
  title: string;
  items: string[];
  address?: string;
  address2?: string;
}) => (
  <div className='text-white space-y-3'>
    <h2 className='text-lg lg:text-2xl font-bold mt-3'>{title}</h2>
    {items.map((item, idx) => (
      <p key={idx} className='text-sm md:text-xs lg:text-base mt-2'>
        {item}
      </p>
    ))}
    {address && (
      <p className='text-sm md:text-xs lg:text-base mt-2'>{address}</p>
    )}
    {address2 && (
      <p className='text-sm md:text-xs lg:text-base mt-2'>{address2}</p>
    )}
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className='relative w-full mt-10'>
      <img
        src={footerBg}
        alt='footer background'
        className='object-cover w-full h-[68rem] md:h-[23rem] lg:h-[30rem] xl:h-auto'
      />

      <div className='absolute inset-0 z-10 px-3 md:px-0 h-[5rem] md:h-auto md:max-w-[45rem] lg:max-w-[60rem] xl:max-w-7xl mx-auto py-5 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6'>
        <div className='flex flex-col space-y-5 mt-3 md:mt-5'>
          <img src={logo} alt='logo' className='w-36' />

          <div className='flex gap-3 lg:gap-5 text-white text-lg md:text-xl lg:text-2xl'>
            {socialIcons.map(({ icon }, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>

          <p className='text-white text-base'>WishWeaver Inc. © 2025</p>
        </div>

        {footerLinks.map((section, index) => (
          <FooterSection
            key={index}
            title={section.title}
            items={section.items}
            address={section.address}
            address2={section.address2}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
