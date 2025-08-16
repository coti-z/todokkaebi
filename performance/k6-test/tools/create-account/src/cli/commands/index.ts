import { Command } from 'commander';
import { CreateAccountCommand } from './create-accounts.command.ts';
import chalk from 'chalk';

const program = new Command();
program.name('k6-tools').description('K6 Load Test Tools').version('1.0.0');

program
  .command('create')
  .description('Create test accounts')
  .option('-c, --count <number>', 'Number of accounts to create', '100')
  .option('-u, --url <url>', 'GraphQL API URL', 'http://localhost:3000/graphql')
  .option('-o, --output <file>', 'Output file path', './data/accounts.json')
  .option('-b, --batch <number>', 'Batch size for concurrent requests', '10')
  .option('-p, --prefix <string>', 'Email prefix', 'loadTest')
  .option('--password <string>', 'Account password', 'LoadTest123!')
  .option('--clean', 'Remove existing accounts file before creating', false)
  .action(async options => {
    try {
      const command = new CreateAccountCommand(options);
      await command.execute();
    } catch (error) {
      console.error(chalk.red('x Command failed: '), error);
      process.exit(1);
    }
  });

process.on('unhandledRejection', error => {
  console.error(chalk.red('\n Unhandled error:'), error);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n Interrupted by user'));
  process.exit(0);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
