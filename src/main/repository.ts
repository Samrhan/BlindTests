import * as storage from 'electron-json-storage';

export default class Repository {
  private static instance: Repository;

  static get(key: string): Promise<object> {
    return new Promise((resolve) => {
      storage.get(key, (error, data) => {
        resolve(data ?? {});
      });
    });
  }

  static set(key: string, value: object): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.set(key, value, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  static remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.remove(key, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  static clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.clear((error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  static setConfig(config: object): Promise<void> {
    return Repository.set('config', config);
  }

  static getConfig(): Promise<Record<string, string>> {
    return Repository.get('config').then((config) => {
      return config ? (config as Record<string, string>) : {};
    });
  }

  static async setConfigKey(key: string, value: string): Promise<void> {
    const config = await Repository.getConfig();
    config[key] = value;
    await Repository.setConfig(config);
  }

  static async getConfigKey(key: string): Promise<string> {
    const config = await Repository.getConfig();
    return config[key];
  }
}
