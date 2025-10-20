import { EventEmitter } from 'events';
const emitter = new EventEmitter();

//login
emitter.on('userLoggedIn', (username) => {
console.log(`User ${username} has logged in.`);
});

export {emitter};