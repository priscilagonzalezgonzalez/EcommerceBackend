import EventEmitter from 'node:events';

export const eventEmitter: EventEmitter = new EventEmitter();

// optional: increase max listeners to avoid node warnings
eventEmitter.setMaxListeners(50);

export default eventEmitter;
