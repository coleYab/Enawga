import winston from 'winston';

// Set up Winston logger with custom formatting
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const { duration, method, statusCode, url } = message;
      return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} ${statusCode} - ${duration}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'api.log' }),
  ],
});

const logServerRequests = (req, res, next) => {
  const { method, url } = req;
  const start = Date.now();

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const duration = `${Date.now() - start}ms`;

    logger.info({
      method,
      url,
      statusCode,
      duration,
    });
  });

  next();
};

export default logServerRequests;

