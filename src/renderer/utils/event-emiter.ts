interface EmitProps {
  noCallback?: boolean;
}

export default async function emit<T>(
  name: string,
  options?: unknown,
  listenOptions?: EmitProps
): Promise<T> {
  return new Promise((resolve, reject) => {
    window.electron.ipcRenderer.sendMessage(name, [options] ?? []);
    if (listenOptions?.noCallback) {
      resolve(undefined as T);
      return;
    }
    const timeout = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, 10000);

    window.electron.ipcRenderer.once(`${name}-reply`, (...args) => {
      clearTimeout(timeout);
      resolve(args?.[0] as unknown as T);
    });
  });
}
