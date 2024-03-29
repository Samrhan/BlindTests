import IpcMainEvent = Electron.IpcMainEvent;
import { ipcMain } from 'electron';

export interface EventProps {
  [key: string]: unknown;
}

export abstract class Event {
  name: string;

  protected constructor(name: string) {
    this.name = name;
  }

  abstract handler(options: EventProps): any;
}

export default function RegisterEvents(events: any[]) {
  events.forEach((EventClass) => {
    const event = new EventClass();
    ipcMain.on(event.name, async (ipcEvent: IpcMainEvent, args: EventProps) => {
      const response = await event.handler(args[0]);
      ipcEvent.reply(`${event.name}-reply`, response);
    });
  });
}
