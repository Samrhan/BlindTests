import * as difflib from 'difflib';
import { Message } from '../../shared/interfaces/interfaces';
import { v4 } from 'uuid';
import { similarity } from './distance';

const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const group = (message: string) => {
  const groups = [];
  for (let i = 0; i < message.length; i++) {
    for (let j = i + 1; j < message.length + 1; j++) {
      groups.push(message.slice(i, j));
    }
  }
  return groups;
};

export default function parseMessage(message: string, artist: string, title: string, author: string): Message | undefined {
  const normalizedMessage = normalize(message);
  const normalizedTitleAnswer = normalize(title);
  const normalizedArtistAnswer = normalize(artist);
  const groups = group(normalizedMessage);

  const matchTitle = difflib.getCloseMatches(normalizedTitleAnswer, groups, 1, 0.9)[0];
  const matchArtist = difflib.getCloseMatches(normalizedArtistAnswer, groups, 1, 0.9)[0];

  if (!matchTitle && !matchArtist) {
    return;
  }
  const titleIndex = normalizedMessage.indexOf(matchTitle);
  const artistIndex = normalizedMessage.indexOf(matchArtist);
  return {
    id: v4(),
    author,
    content: message,
    timestamp: Date.now(),
    title: matchTitle ? {
      accuracy: similarity(normalizedTitleAnswer, matchTitle),
      match: {
        start: titleIndex,
        end: titleIndex + matchTitle.length
      }
    } : undefined,
    artist: matchArtist ? {
      accuracy: similarity(normalizedArtistAnswer, matchArtist),
      match: {
        start: artistIndex,
        end: artistIndex + matchArtist.length
      }
    } : undefined
  };

}
