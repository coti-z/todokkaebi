export class DateUtils {
  /**
   * 년, 월, 일을 받아 Date 객체로 변환합니다.
   * @param year 연도 (예: 2023)
   * @param month 월 (1-12)
   * @param day 일 (1-31)
   * @returns Date 객체
   */
  static createDate(year: number, month: number, day: number): Date {
    // JavaScript의 월은 0부터 시작하므로 1을 빼줍니다.
    return new Date(Date.UTC(year, month - 1, day));
  }

  /**
   * 'YYYY-MM-DD' 형식의 문자열을 Date 객체로 변환합니다.
   * @param dateString 'YYYY-MM-DD' 형식의 날짜 문자열
   * @returns Date 객체
   */
  static parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return this.createDate(year, month, day);
  }
}
