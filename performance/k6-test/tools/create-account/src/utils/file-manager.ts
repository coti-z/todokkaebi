import fs from 'fs';
import path from 'path';
import { Logger } from './logger.ts';
import { Account } from '../types/account-types.ts';

export class FileManager {
  private static logger = new Logger('FileManager');

  static createDirectory(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      this.logger.info(`Directory created: ${dirPath}`);
    }
  }

  static loadAccounts(filePath: string): Account[] {
    if (!fs.existsSync(filePath)) {
      this.logger.info(`File not found: ${filePath}`);
      return [];
    }

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const accounts = JSON.parse(data) as Account[];
      this.logger.info(`Loaded ${accounts.length} accounts from ${filePath}`);
      return accounts;
    } catch (error) {
      this.logger.error(`Failed to load accounts: ${error}`);
      return [];
    }
  }

  static saveAccounts(filePath: string, accounts: Account[]): void {
    try {
      this.createDirectory(path.dirname(filePath));
      fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));
      this.logger.info(`Saved ${accounts.length} accounts to ${filePath}`);
    } catch (error) {
      this.logger.error(`Failed to save accounts: ${error}`);
    }
  }

  static appendAccounts(filePath: string, newAccounts: Account[]): void {
    const existingAccounts = this.loadAccounts(filePath);
    const combined = [...existingAccounts, ...newAccounts];
    this.saveAccounts(filePath, combined);
  }

  static backupFile(filePath: string): string | null {
    if (!fs.existsSync(filePath)) return null;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = filePath.replace('.json', `-backup-${timestamp}.json`);

    try {
      fs.copyFileSync(filePath, backupPath);
      this.logger.info(`Backup created`);
      return backupPath;
    } catch (error) {
      this.logger.error(`Failed failed: ${error}`);
      return null;
    }
  }

  static deleteFile(filePath: string): boolean {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.info(`File deleted: ${filePath}`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error}`);
      return false;
    }
  }
}
