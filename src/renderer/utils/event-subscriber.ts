const registeredEvents: string[] = [];

export default function on(
  name: string,
  callback: (...args: any[]) => void
): undefined {
  if (registeredEvents.includes(name)) {
    return;
  }
  window.electron.ipcRenderer.on(name, callback);
  registeredEvents.push(name);
}
