import { Match, Message } from '../../../../../../shared/interfaces/interfaces';
import { useCallback, useState } from 'react';

interface ChatMessageProps {
  message: Message;
  confirmTitle: () => void;
  confirmArtist: () => void;
}

export default function ChatMessage({ message, confirmArtist, confirmTitle }: ChatMessageProps) {
  const [hovering, setHovering] = useState<boolean>(false);
  const setHoveringTrue = useCallback(() => setHovering(true), []);
  const setHoveringFalse = useCallback(() => setHovering(false), []);

  let messageDisplay: JSX.Element;
  if (message.title && message.artist) {
    let first: { accuracy: number; match: Match };
    let second: { accuracy: number; match: Match };
    let firstClass = 'bg-green-900';
    let secondClass = 'bg-red-900';
    if (message.title.match.start < message.artist.match.start) {
      first = message.title;
      second = message.artist;
    } else {
      first = message.artist;
      second = message.title;
      firstClass = 'bg-red-900';
      secondClass = 'bg-green-900';
    }
    messageDisplay = (
      <>
        {message.content.slice(0, first.match.start)}
        <span className={firstClass}>
          {message.content.slice(first.match.start, first.match.end)}
        </span>
        {message.content.slice(first.match.end, second.match.start)}
        <span className={secondClass}>
          {message.content.slice(second.match.start, second.match.end)}
        </span>
        {message.content.slice(second.match.end)}
      </>
    );
  } else if (message.title) {
    messageDisplay = (
      <>
        {message.content.slice(0, message.title.match.start)}
        <span className='bg-green-900'>
          {message.content.slice(
            message.title.match.start,
            message.title.match.end
          )}
        </span>
        {message.content.slice(message.title.match.end)}
      </>
    );
  } else if (message.artist) {
    messageDisplay = (
      <>
        {message.content.slice(0, message.artist.match.start)}
        <span className='bg-red-900'>
          {message.content.slice(
            message.artist.match.start,
            message.artist.match.end
          )}
        </span>
        {message.content.slice(message.artist.match.end)}
      </>
    );
  } else {
    messageDisplay = <>{message.content}</>;
  }
  return (
    <div className='w-full' onMouseEnter={setHoveringTrue} onMouseLeave={setHoveringFalse}>
      <div className='min-h-20'>
        {hovering ? (<div className='flex flex-row text-center justify-center gap-3'>
          {message.artist && <button onClick={confirmArtist}
                                     className='p-2.5 my-3 flex text-left items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white'>Confirmer
            l'artiste</button>}
          {message.title && <button onClick={confirmTitle}
                                    className='p-2.5 my-3 flex text-left items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white'>Confirmer
            le titre</button>}
        </div>) : (
          <div className='text-gray-200 hover:bg-gray-800 p-2 rounded-2xl'>
            <div className='grid grid-cols-3 gap-3'>
              <div className='font-bold'>{message.author}&nbsp;:</div>
              {message.artist && (
                <div className='bg-gray-800 rounded-3xl text-center text-xs p-1'>
                  Artiste : {Math.floor(message.artist.accuracy * 100)}%
                </div>
              )}
              {message.title && (
                <div className='bg-gray-800 rounded-3xl text-center text-xs p-1'>
                  Titre : {Math.floor(message.title.accuracy * 100)}%
                </div>
              )}
            </div>
            <p>{messageDisplay}</p>
          </div>)}
      </div>
      <div className='my-1 bg-gray-600 h-[1px]'></div>
    </div>
  );
}
