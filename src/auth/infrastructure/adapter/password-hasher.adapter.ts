import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PasswordHasherOutboundPort } from '@auth/application/port/out/password-hasher.port';

@Injectable()
export class BcryptPasswordHasherAdapter implements PasswordHasherOutboundPort {
  private readonly saltRounds = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
