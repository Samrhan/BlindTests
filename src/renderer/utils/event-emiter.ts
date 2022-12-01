export default async function emit<T>(
  name: string,
  options?: unknown
): Promise<T> {
  return new Promise((resolve, reject) => {
    window.electron.ipcRenderer.sendMessage(name, [options] ?? []);
    const timeout = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, 10000);

    window.electron.ipcRenderer.once(`${name}-reply`, (...args) => {
      clearTimeout(timeout);
      resolve(args[0] as unknown as T);
    });
  });
}
