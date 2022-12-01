import { Match, Message } from '../../../../../../shared/interfaces/interfaces';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
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
        <span className="bg-green-900">
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
        <span className="bg-red-900">
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
    <div className="w-full">
      <div className="text-gray-200 hover:bg-gray-800 p-2 rounded-2xl">
        <div className="grid grid-cols-3 gap-3">
          <div className="font-bold">{message.author}&nbsp;:</div>
          {message.artist && (
            <div className="bg-gray-800 rounded-3xl text-center text-xs p-1">
              Artiste : {message.artist.accuracy * 100}%
            </div>
          )}
          {message.title && (
            <div className="bg-gray-800 rounded-3xl text-center text-xs p-1">
              Titre : {message.title.accuracy * 100}%
            </div>
          )}
        </div>
        <p>{messageDisplay}</p>
      </div>
      <div className="my-1 bg-gray-600 h-[1px]"></div>
    </div>
  );
}
