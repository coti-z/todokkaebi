import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { FILE_PATHS } from '../config/constants.js';
export enum LogLevel {
  DEBUG = 1,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private static globalLevel = LogLevel.INFO;

  private logFile?: string;

  private context: string;

  constructor(context: string) {
    this.context = context;
    const date = new Date().toISOString().split('T')[0];
    const logDir = FILE_PATHS.LOGS_DIR;

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.logFile = path.join(logDir, `${date}.log`);
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (level < Logger.globalLevel) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${this.context}]`;

    switch (level) {
      case LogLevel.DEBUG:
        console.log(chalk.gray(`${prefix} ${message}`), ...args);
        break;
      case LogLevel.INFO:
        console.log(chalk.blue(`${prefix} ${message}`), ...args);
        break;
      case LogLevel.WARN:
        console.log(chalk.yellow(`${prefix} ${message}`), ...args);
        break;
      case LogLevel.ERROR:
        console.log(chalk.red(`${prefix} ${message}`), ...args);
        break;
    }

    if (this.logFile) {
      const logEntry = `${prefix} [${LogLevel[level]}] ${message} ${args.join(' ')}\n`;
      fs.appendFileSync(this.logFile, logEntry);
    }
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  static setGlobalLevel(level: LogLevel): void {
    Logger.globalLevel = level;
  }
}
