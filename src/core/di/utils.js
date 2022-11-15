import { injectable } from 'inversify';
import { diContainer } from './di';

export const appInject = (identifier) => {
  return diContainer.get(identifier);
};

export { injectable as appInjectable };
