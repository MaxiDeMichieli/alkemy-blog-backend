const winston = require('winston');
const expressWinston = require('express-winston');

const myFormat = winston.format.printf(({
  level, message, timestamp,
}) => `${level}: ${message} | ${timestamp}`);

const logger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json(),
    myFormat,
  ),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: () => false,
});

module.exports = logger;
