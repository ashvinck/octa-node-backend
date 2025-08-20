import morgan from 'morgan';
import type { StreamOptions } from 'morgan';
import logger from './logger';

const stream: StreamOptions = {
  write: (message) => logger.info(message.trim()),
};

const morganWinstonLogger = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':method :url :status :res[content-length] - :response-time ms',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream }
);

export default morganWinstonLogger;
