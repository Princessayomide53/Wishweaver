import React, { useState } from 'react';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

const Frequent = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const Questions = [
    {
      id: 1,
      question: 'What is WishWeaver?',
      answer:
        'WishWeaver is an online platform for creating group appreciation cards with contributions from multiple people, making any occasion more meaningful.',
    },
    {
      id: 2,
      question: 'What Occasions can i use WishWeaver for?',
      answer:
        'WishWeaver is an online platform for creating group appreciation cards with contributions from multiple people, making any occasion more meaningful.',
    },
    {
      id: 3,
      question: 'Can i add cash gifts to the group card?',
      answer: `Very soon contributors will be able to securely add cash to the group card. We're also working on integrating vouchers and gift cards—stay tuned!`,
    },
    {
      id: 4,
      question: 'Is Wish Weaver free',
      answer:
        'WishWeaver uses a pay-per-use model. Weave a card for as little as the cost of a cup of coffee—no subscriptions or hidden fees.',
    },
    {
      id: 5,
      question: 'Can i use WishWeaver for work-related celebration?',
      answer:
        'Absolutely! WishWeaver is perfect for creating cards for workplace milestones, promotions, or farewells.',
    },
  ];

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <section className='my-20'>
      <h2 className='text-center text-4xl font-bold text-[#0B0C0E]'>
        Frequently Asked Questions
      </h2>
      <p className='text-center text-2xl font-normal py-4 text-[#0B0C0E]'>
        Here are answers to common questions to help you get started. For
        <br /> more details, visit our{' '}
        <a href='https://support.mywishweaver.com/' className='text-[#ff7f50]'>
          help center.
        </a>
      </p>

      <div className='mt-10 max-w-4xl space-y-5 mx-auto'>
        {Questions.map(({ id, question, answer }) => (
          <div
            key={id}
            className='border-[1px] rounded-2xl border-[#E2E8F0] px-4 py-5 bg-white shadow-xs cursor-pointer'
            onClick={() => toggle(id)}
          >
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold text-[#0B0C0E]'>
                {question}
              </h3>
              {openId === id ? (
                <IoChevronUp size={20} />
              ) : (
                <IoChevronDown size={20} />
              )}
            </div>

            {openId === id && (
              <p className='mt-2.5 text-gray-600 text-lg font-normal transition-all duration-300'>
                {answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Frequent;
