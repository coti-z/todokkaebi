import { DomainException, ErrorCode } from '@libs/exception';

export interface EmailProp {
  email: string;
}
export class Email {
  private readonly value: string;

  private constructor(prop: EmailProp) {
    this.value = prop.email;
  }

  static create(prop: EmailProp): Email {
    this.validateFormat(prop.email);
    return new Email({ email: prop.email });
  }

  private static validateFormat(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new DomainException(ErrorCode.INVALID_EMAIL_FORMAT);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return other.getValue() === this.value;
  }
}
