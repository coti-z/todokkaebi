import cliProgress from 'cli-progress';
import chalk from 'chalk';

export class ProgressManager {
  private progressBar: cliProgress.SingleBar;
  private startTime: number = 0;
  private currentValue: number = 0;

  constructor(private label: string = 'Progress') {
    this.progressBar = new cliProgress.SingleBar({
      format: this.buildFormat(),
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    });
  }

  private buildFormat(): string {
    return (
      `${this.label} |` +
      chalk.cyan('{bar}') +
      '| {percentage}% | {value}/{total} | {Speed}/s | {eta_formatted}'
    );
  }

  start(total: number): void {
    this.startTime = Date.now();
    this.currentValue = 0;
    this.progressBar.start(total, 0, {
      speed: 'N/A',
    });
  }

  increment(value: number = 1): void {
    this.currentValue += value;
    const elapsed = (Date.now() - this.startTime) / 1000;
    const speed = elapsed > 0 ? (this.currentValue / elapsed).toFixed(2) : '0';

    this.progressBar.increment(value, {
      speed,
    });
  }

  update(value: number): void {
    this.currentValue = value;
    const elapsed = (Date.now() - this.startTime) / 1000;
    const speed = elapsed > 0 ? (this.currentValue / elapsed).toFixed(2) : '0';

    this.progressBar.update(value, {
      speed,
    });
  }

  stop(): void {
    this.progressBar.stop();
  }

  succeed(message?: string): void {
    this.progressBar.stop();
    if (message) {
      console.log(chalk.green(`✓ ${message}`));
    }
  }

  fail(message?: string): void {
    this.progressBar.stop();
    if (message) {
      console.log(chalk.red(`✖ ${message}`));
    }
  }
}
