import { Message } from '../../../../../shared/interfaces/interfaces';
import ChatMessage from './message/ChatMessage';
import { useMemo } from 'react';

interface ChatProps {
  messages: Message[];
  username: string;
  confirmTitle: (id: string) => void;
  confirmArtist: (id: string) => void;
}

export default function Chat({ messages, username, confirmArtist, confirmTitle }: ChatProps) {
  const displayMessages = messages.map((message) => {
    return <ChatMessage key={message.id} message={message} confirmTitle={() => confirmTitle(message.id)}
                        confirmArtist={() => confirmArtist(message.id)} />;
  });

  const usernameDisplay = useMemo(() => {
    return <span className='capitalize font-bold'>{username}</span>;
  }, [username]);

  return (
    <div className='bg-gray-900 h-full py-5 pr-5 min-w-[25vw] max-h-[100vh]'>
      <div className='bg-gray-800 h-full p-2 rounded-r-2xl'>
        <div className='bg-gray-900 h-full rounded-3xl'>
          <h1 className='text-xl text-white text-center py-3'>
            Connecté au chat de {usernameDisplay}
          </h1>
          <div className='my-1 bg-gray-600 h-[1px] mx-3'></div>
          <div className='flex flex-row h-[90%] overflow-y-scroll'>
            <div className='flex flex-1 flex-col overflow-y-auto p-2'>
              {displayMessages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
