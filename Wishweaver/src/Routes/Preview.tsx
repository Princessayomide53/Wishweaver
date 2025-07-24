import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import ThreeDModel from '../components/ThreeDModel';

type WishCardData = {
  occasion: string;
  template: string;
  name: string;
  recipient: string;
  message?: string;
};

type GroupMessage = {
  fileName: string;
  message: string;
  timestamp: string;
};

const Preview = () => {
  const [cardData, setCardData] = useState<WishCardData | null>(null);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);

  useEffect(() => {
    const card = localStorage.getItem('wishCardData');
    const messageData = localStorage.getItem('groupMessageData');

    if (card) setCardData(JSON.parse(card));

    // Handle multiple group messages if needed later
    if (messageData) {
      const parsed = JSON.parse(messageData);
      setGroupMessages([parsed]);
    }
  }, []);

  return (
    <>
      <Nav />
      <article className='min-h-screen p-6 md:p-12 bg-gray-600 text-gray-800'>
        <div className='max-w-6xl mx-auto space-y-10 pt-20'>
          {/* Card Section */}
          {cardData && cardData.occasion === 'Birthday' && 'Graduation' && (
            <article className='bg-white shadow-lg rounded-xl overflow-hidden'>
              <figure className='w-full h-64 bg-gray-200'>
                {cardData.template && (
                  <img
                    src={cardData.template}
                    alt='template'
                    className='w-full h-full object-cover'
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </figure>
              <div className='p-6'>
                <h2 className='text-2xl font-semibold mb-2'>
                  To: {cardData.recipient}
                </h2>
                <p className='text-lg text-gray-700 mb-4'>
                  From: {cardData.name}
                </p>
                {cardData.message && (
                  <p className='bg-gray-100 p-4 rounded text-gray-700'>
                    {cardData.message}
                  </p>
                )}
              </div>
            </article>
          )}
          {cardData &&
            cardData.occasion === 'Customize' &&
            cardData.message && (
              <div className='bg-white shadow-lg rounded-xl overflow-hidden p-4'>
                <h2 className='text-xl font-semibold mb-4'>
                  To: {cardData.recipient}
                </h2>
                <p className='text-lg text-gray-700 mb-2'>
                  From: {cardData.name}
                </p>
                <ThreeDModel message={cardData.message} />
              </div>
            )}

          {cardData && cardData.occasion !== 'Customize' && (
            <article className='bg-white shadow-lg rounded-xl overflow-hidden'>
              <figure className='w-full h-64 bg-gray-200'>
                {cardData.template && (
                  <img
                    src={cardData.template}
                    alt='template'
                    className='w-full h-full object-cover'
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </figure>
              <div className='p-6'>
                <h2 className='text-2xl font-semibold mb-2'>
                  To: {cardData.recipient}
                </h2>
                <p className='text-lg text-gray-700 mb-4'>
                  From: {cardData.name}
                </p>
                {cardData.message && (
                  <p className='bg-gray-100 p-4 rounded text-gray-700'>
                    {cardData.message}
                  </p>
                )}
              </div>
            </article>
          )}

          {/* Group Messages Grid */}
          {groupMessages.length > 0 && (
            <div>
              <h3 className='text-2xl font-semibold mb-4'>Group Messages</h3>
              <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {groupMessages.map((item, i) => (
                  <div
                    key={i}
                    className='bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between'
                  >
                    {/* Simulate image if it was saved */}
                    <div className='h-48 bg-gray-200 flex items-center justify-center'>
                      <p className='text-sm text-gray-600'>{item.fileName}</p>
                    </div>
                    <div className='p-4'>
                      <p className='text-gray-800'>{item.message}</p>
                      <p className='text-xs text-gray-400 mt-2'>
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If no data */}
          {!cardData && groupMessages.length === 0 && (
            <div className='text-center text-gray-600 text-xl'>
              No card or messages found in local storage.
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default Preview;
