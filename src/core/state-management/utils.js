import { makeObservable } from 'mobx';
export { observable as appObservable, computed as appComputed } from 'mobx';
export { observer as appObserver } from 'mobx-react';

export const appMakeObservable = (target, annotations, options) => makeObservable(target, annotations, options);
