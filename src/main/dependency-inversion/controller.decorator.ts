import { Container, Injection } from './container';

export function Controller() {
  return function injectionTarget<T extends { new(...args: any[]): {} }>(constructor: T): T | void {
    // replacing the original constructor with a new one that provides the injections from the Container
    return class extends constructor {
      constructor(...args: any[]) {
        // get injections from class; previously created by @inject()
        const injections = (constructor as any).injections as Injection[];
        // get the instances to inject from the Container
        // this implementation does not support args which should not be injected
        const injectedArgs: any[] = injections.map(({ key }) => {
          return Container.get(key);
        });
        // call original constructor with injected arguments
        super(...injectedArgs);
      }
    };
  };
}
