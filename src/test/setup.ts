import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '../../.env.test'),
});

console.log('test env loaded:', process.env);
