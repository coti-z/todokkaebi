import { join } from 'path';

import * as dotenv from 'dotenv';

dotenv.config({
  path: join(__dirname, '../.env.test'),
});
