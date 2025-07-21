import React from 'react';

const Nav = () => {
  return (
    <header className='flex mx-auto justify-between w-full max-w-7xl py-5'>
      {/* <div className=''> */}
      <h1>WishWeaver</h1>

      <nav className='flex space-x-7'>
        <ul className='flex space-x-20'>
          <li>Create</li>
          <li>Resources</li>
          <li>Features</li>
          <li>How it works</li>
          <li>Testimonial</li>
          <li>Pricing</li>
        </ul>

        <button>Weave your card</button>
        <h2>Sign in</h2>
      </nav>
      {/* </div> */}
    </header>
  );
};

export default Nav;
