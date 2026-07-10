import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const errorLogStream = fs.createWriteStream(path.join(logsDir, 'error.log'), {
  flags: 'a',
});
export const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

const timestamp = () => new Date().toISOString();

export const logger = {
  info: (msg) => console.log(`[INFO] ${timestamp()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${timestamp()} - ${msg}`),
  error: (msg) => {
    console.error(`[ERROR] ${timestamp()} - ${msg}`);
    errorLogStream.write(`[ERROR] ${timestamp()} - ${msg}\n`);
  },
};
