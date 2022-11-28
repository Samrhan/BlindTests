import { EventProps, Event } from '../events';
import Repository from '../repository';

export interface RegisterEventProps extends EventProps {
  key: string;
}

export default class CheckConfigEvent extends Event {
  constructor() {
    super('check-register');
  }

  async handler(options: RegisterEventProps): Promise<boolean> {
    const key = await Repository.getConfigKey('user');
    return !!key;
  }
}
