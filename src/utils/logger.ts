import winston from 'winston';

const colorizer = winston.format.colorize();

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
  }),
  winston.format.align(),
  winston.format.printf(({ timestamp, level, message }) => {
    const fullMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    return colorizer.colorize(level, fullMessage);
  })
);

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log', level: 'error' }),
  ],
});

export default logger;
