import { EventEmitter } from 'events';
import chalk from 'chalk';
const logger = new EventEmitter();

logger.on('log', ({ level, message }) => {
  const time = new Date().toLocaleString();
  const color = {
    info: chalk.green,
    warning: chalk.yellow,
    error: chalk.red
  }
  console.log(`[${time}] ${color[level](level.toUpperCase())}: ${message}`);
});
// shortcut synt
logger.info = (message) => logger.emit('log', { level: 'info', message });
logger.warning = (message) => logger.emit('log', { level: 'warning', message });
logger.error = (message) => logger.emit('log', { level: 'error', message });

export {logger};
