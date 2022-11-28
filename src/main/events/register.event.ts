import { EventProps, Event } from '../events';
import Repository from '../repository';

export interface RegisterEventProps extends EventProps {
  username: string;
}

export default class RegisterEvent extends Event {
  constructor() {
    super('register');
  }

  async handler(options: RegisterEventProps): Promise<boolean> {
    await Repository.setConfigKey('user', options.username);
    return true;
  }
}
