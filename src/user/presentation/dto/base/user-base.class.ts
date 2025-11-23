/**
 * user output data interface
 *
 * @remarks Graphql, Rest use this
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserBaseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 'user-abc-123',
  })
  id: string;

  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '닉네임',
    example: 'dokkaebi',
  })
  nickname: string;

  @ApiPropertyOptional({
    description: '생년월일',
    example: '1990-01-01T00:00:00.000Z',
  })
  @IsDateString()
  birthday?: Date;

  @ApiProperty({
    description: '생성일',
    example: '2025-11-23T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2025-11-23T10:30:00.000Z',
  })
  updatedAt: Date;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  password: string;
}
