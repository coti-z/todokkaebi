import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});
export const ENV = {
  API_URL: process.env.API_URL || 'http://localhost:3000/graphql',
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES || '3'),
} as const;
