import { Playlist, PlaylistBody } from '../../shared/interfaces/interfaces';
import { Event, EventProps } from '../events';
import Repository from '../repository';
import {v4 as uuidV4} from 'uuid';
import fs from 'fs';

interface GetFileProps extends EventProps {
  path: string;
}

export default class GetFile extends Event {
  constructor() {
    super('get-file');
  }

  async handler({ path }: GetFileProps): Promise<string> {
    const bitmap = fs.readFileSync(path);
    return Buffer.from(bitmap).toString('base64');
  }
}
