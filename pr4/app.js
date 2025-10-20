import express from 'express';
import chalk from 'chalk';
import { emitter } from './events-demo.js';
import {logger} from './logger.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    emitter.emit('newRequest', req.url);
    res.send('Chalk + EventEmitter + Express = 💪');
});

app.get('/info', (req, res) => {
emitter.emit('newRequest', req.url);
console.log(chalk.green('Info endpoint accessed!'));
res.send('Information page logged in green color!');
});

app.listen(PORT, () => {
console.log(chalk.blue(`Server is running at
http://localhost:${PORT}`));
});

emitter.emit('userLoggedIn', 'makeev');
logger.info('User registered');
logger.warning('Unknown route requested');
logger.error('Internal server error');
