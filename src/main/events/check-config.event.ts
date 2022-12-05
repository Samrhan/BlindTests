import { Event, EventProps } from '../events';
import Repository from '../repository';

export interface RegisterEventProps extends EventProps {
  key: string;
}

export default class CheckConfigEvent extends Event {
  constructor() {
    super('check-register');
  }

  async handler(options: RegisterEventProps): Promise<string | undefined> {
    return await Repository.getConfigKey('user');
  }
}
