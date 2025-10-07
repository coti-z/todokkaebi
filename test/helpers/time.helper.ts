export class TimeHelper {
  static getRandomFutureDate(daysFromNow: number = 7): Date {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * daysFromNow) + 1;
    return new Date(now.getTime() + randomDays * 24 * 60 * 60 * 1000);
  }

  static getRandomPastDate(daysAgo: number = 7): Date {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * daysAgo) + 1;
    return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
  }

  static generateTimeRange(): { startTime: Date; endTime: Date } {
    const startTime = this.getRandomFutureDate(7);
    const endTime = new Date(
      startTime.getTime() +
        Math.floor(Math.random() * 7 + 1) * 24 * 60 * 60 * 1000,
    );
    return { startTime, endTime };
  }

  static formatToISOString(date: Date): string {
    return date.toISOString();
  }
}
