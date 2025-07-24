import { useEffect, useState } from 'react';
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
  from: string;
  file: string;
};

const Cards = () => {
  const [cardData, setCardData] = useState<WishCardData | null>(null);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);

  useEffect(() => {
    const card = localStorage.getItem('wishCardData');
    const messageData = localStorage.getItem('groupMessageData');

    console.log('Card data from localStorage:', card); // Debug log
    console.log('Message data from localStorage:', messageData); // Debug log

    if (card) {
      try {
        const parsedCard = JSON.parse(card);
        console.log('Parsed card data:', parsedCard); // Debug log
        setCardData(parsedCard);
      } catch (err) {
        console.error('Invalid card data:', err);
      }
    }

    if (messageData) {
      try {
        const parsed = JSON.parse(messageData);
        if (Array.isArray(parsed)) {
          setGroupMessages(parsed);
        }
      } catch (err) {
        console.error('Invalid group message data:', err);
      }
    }
  }, []);

  // Debug: Log current state
  console.log('Current cardData:', cardData);
  console.log('Current groupMessages:', groupMessages);

  return (
    <>
      <Nav />
      <article className='min-h-screen p-6 md:p-12 bg-gray-600 text-gray-800'>
        <div className='max-w-6xl mx-auto space-y-10 pt-20'>
          {/* Debug section - Remove this after fixing */}
          <div className='bg-yellow-100 p-4 rounded-lg text-black'>
            <h3 className='font-bold'>Debug Info:</h3>
            <p>Card Data: {cardData ? JSON.stringify(cardData) : 'null'}</p>
            <p>Group Messages Count: {groupMessages.length}</p>
            <p>Card Occasion: {cardData?.occasion || 'N/A'}</p>
          </div>

          {/* Fixed Card Section */}
          {cardData &&
            cardData.occasion === 'Customize' &&
            cardData.message && (
              <div className='bg-white h-[30rem] lg:h-auto shadow-lg rounded-xl overflow-hidden p-4'>
                <h2 className='text-xl font-semibold mb-4'>
                  To: {cardData.recipient}
                </h2>
                <p className='text-lg text-gray-700 mb-2'>
                  From: {cardData.name}
                </p>
                <ThreeDModel message={cardData.message} />
              </div>
            )}

          {/* Regular Card Section - Fixed condition */}
          {cardData && cardData.occasion !== 'Customize' && (
            <article className='bg-white shadow-lg rounded-xl overflow-hidden'>
              <figure className='w-full h-64 bg-gray-200'>
                {cardData.template && (
                  <img
                    src={cardData.template || '/placeholder.svg'}
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
              <h3 className='text-2xl text-white font-semibold mb-4'>
                Group Messages
              </h3>
              <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {groupMessages.map((item, i) => (
                  <div
                    key={i}
                    className='bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between'
                  >
                    {item.file && (
                      <div className='h-48 bg-gray-200 flex items-center justify-center'>
                        {item.file.startsWith('data:image') ? (
                          <img
                            src={item.file || '/placeholder.svg'}
                            alt='Uploaded visual'
                            className='object-cover h-full w-full'
                          />
                        ) : item.file.startsWith('data:audio') ? (
                          <audio controls className='w-full px-2'>
                            <source src={item.file} />
                            Your browser does not support the audio element.
                          </audio>
                        ) : null}
                      </div>
                    )}
                    <div className='p-4'>
                      <p className='text-gray-800'>{item.message}</p>
                      <p className='text-xs text-gray-500 mt-2'>
                        From: <span className='font-semibold'>{item.from}</span>
                      </p>
                      <p className='text-xs text-gray-400'>
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
            <div className='text-center text-white text-xl'>
              No card or messages found in local storage.
            </div>
          )}

          {/* Show something always for testing */}
          <div className='bg-white p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-2'>
              Cards Page Loaded Successfully
            </h3>
            <p>This section always shows to confirm the page is working.</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Cards;
