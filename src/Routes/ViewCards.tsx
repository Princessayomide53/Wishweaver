import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import ThreeDModel from '../components/ThreeDModel';
import { useNavigate } from 'react-router-dom';

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

const ViewCards = () => {
  const [cardDataList, setCardDataList] = useState<WishCardData[]>([]);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);

  useEffect(() => {
    const cardArray = localStorage.getItem('wishCardData');
    const messageData = localStorage.getItem('groupMessageData');

    if (cardArray) {
      try {
        const parsed = JSON.parse(cardArray);
        if (Array.isArray(parsed)) {
          setCardDataList(parsed);
        }
      } catch (err) {
        console.error('Invalid card array:', err);
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

  return (
    <>
      <Nav />
      <article className='min-h-screen p-6 md:p-12 bg-gray-600 text-gray-800'>
        <div className='max-w-6xl mx-auto space-y-10 pt-20'>
          {/* Cards Section */}
          {cardDataList.map((card, index) => (
            <div
              key={index}
              className='bg-white shadow-lg rounded-xl overflow-hidden'
            >
              <div className='p-6'>
                <h2 className='text-xl font-semibold mb-2'>
                  To: {card.recipient}
                </h2>
                <p className='text-lg text-gray-700 mb-4'>From: {card.name}</p>
              </div>

              {card.occasion === 'Customize' && card.message ? (
                <div className='px-6 pb-6'>
                  <ThreeDModel message={card.message} />
                </div>
              ) : (
                <figure className='w-full h-64 bg-gray-200'>
                  <img
                    src={card.template || '/placeholder.svg'}
                    alt='template'
                    loading='lazy'
                    className='w-full h-full object-cover'
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </figure>
              )}

              {card.message && card.occasion !== 'Customize' && (
                <div className='p-6 pt-2'>
                  <p className='bg-gray-100 p-4 rounded text-gray-700'>
                    {card.message}
                  </p>
                </div>
              )}
            </div>
          ))}

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

          {/* No data fallback */}
          {cardDataList.length === 0 && groupMessages.length === 0 && (
            <div className='text-center text-white text-xl'>
              No card or messages found in local storage.
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default ViewCards;
