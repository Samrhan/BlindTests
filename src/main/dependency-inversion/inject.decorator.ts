import 'reflect-metadata';
import { Injection } from './container';

// in order to know which parameters of the constructor (index) should be injected (identified by key

// add to class which has constructor paramteters marked with @inject()

// mark constructor parameters which should be injected
// this stores the information about the properties which should be injected
export function Inject() {
  return function(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const key = Reflect.getMetadata('design:paramtypes', target)[parameterIndex].name;

    const injection: Injection = { index: parameterIndex, key };
    const existingInjections: Injection[] = (target as any).injections || [];
    // create property 'injections' holding all constructor parameters, which should be injected
    Object.defineProperty(target, 'injections', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: [...existingInjections, injection]
    });
  };
}
