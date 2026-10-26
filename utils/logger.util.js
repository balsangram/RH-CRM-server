import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message}`)
);

const transports = [new winston.transports.Console()];

// Only enable file transports when NOT in a serverless environment (e.g. Vercel)
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  try {
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    transports.push(
      new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: winston.format.combine(winston.format.uncolorize(), winston.format.json()),
      }),
      new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: winston.format.combine(winston.format.uncolorize(), winston.format.json()),
      })
    );
  } catch (err) {
    // Read-only filesystem fallback to console only
  }
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  levels,
  format,
  transports,
});

export default logger;
export { logger };
