import chalk from 'chalk';
import { AccountCreator } from '../../core/account-creator.js';
import { Logger } from '../../utils/logger.js';
import { CreateAccountsOptions } from '../options/create-accounts.options.ts';
import ora from 'ora';
import { Account } from '../../types/account-types.ts';
import { FileManager } from '../../utils/file-manager.ts';

export class CreateAccountCommand {
  private logger: Logger;
  private creator: AccountCreator;

  constructor(private options: CreateAccountsOptions) {
    this.logger = new Logger('CreateAccountsCommand');
    this.creator = new AccountCreator({
      apiUrl: options.url,
      batchSize: parseInt(options.batch),
      prefix: options.prefix,
      password: options.password,
    });
  }

  async execute(): Promise<void> {
    console.log(chalk.blue.bold('\n k6 Load Test Account Creator'));
    this.printConfiguration();

    const existingAccounts = this.handleExistingAccounts();
    const count = parseInt(this.options.count);
    const startIndex = existingAccounts.length;
    console.log(chalk.cyan(`\nCreating ${count} new account...\n`));

    const result = await this.creator.createBatch(count, startIndex);

    const allAccounts = [...existingAccounts, ...result.accounts];
    FileManager.saveAccounts(this.options.output, allAccounts);
  }

  private printConfiguration(): void {
    console.log(chalk.gray(`API URL: ${this.options.url}`));
    console.log(chalk.gray(`Account count: ${this.options.count}`));
    console.log(chalk.gray(`Batch size: ${this.options.batch}`));
    console.log(chalk.gray(`Output file: ${this.options.output}`));
    console.log(chalk.gray(`Email prefix: ${this.options.prefix}`));
  }

  private handleExistingAccounts(): Account[] {
    if (this.options.clean) {
      FileManager.backupFile(this.options.output);
      FileManager.deleteFile(this.options.output);

      console.log(chalk.yellow('✓ Existing accounts file removed'));
      return [];
    }

    const existing = FileManager.loadAccounts(this.options.output);
    if (existing.length > 0) {
      console.log(chalk.cyan(`i Loaded ${existing.length} existing accounts`));
    }
    return existing;
  }
}
