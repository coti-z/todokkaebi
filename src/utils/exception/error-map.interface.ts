import { ErrorCode } from '@/utils/exception/error-code.enum';
import { HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  statusCode: HttpStatus;
  message: string;
}
export const ERROR_MAP: Record<ErrorCode, ErrorResponse> = {
  [ErrorCode.FORBIDDEN]: {
    statusCode: HttpStatus.FORBIDDEN,
    message: '접근 권한이 없습니다.',
  },
  [ErrorCode.SIGN_EMAIL_CONFLICTED]: {
    statusCode: HttpStatus.FORBIDDEN,
    message: '회원가입에 요청한 이메일이 이미 존재합니다.',
  },
  [ErrorCode.TOKEN_EXPIRED]: {
    message: '토큰이 만료되었습니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.INVALID_TOKEN]: {
    message: '유효하지 않은 토큰입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.TOKEN_NOT_PROVIDED]: {
    message: '토큰이 제공되지 않았습니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.UNAUTHORIZED]: {
    message: '인증되지 않은 접근입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.PAYMENT_FAILED]: {
    message: '결제에 실패했습니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.INSUFFICIENT_FUNDS]: {
    message: '잔액이 부족합니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.PAYMENT_ALREADY_PROCESSED]: {
    message: '이미 처리된 결제입니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.PAYMENT_EXPIRED]: {
    message: '결제 기한이 만료되었습니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.BOOKING_NOT_FOUND]: {
    message: '예약을 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.BOOKING_ALREADY_EXISTS]: {
    message: '이미 존재하는 예약입니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.BOOKING_CANCELED]: {
    message: '취소된 예약입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.BOOKING_NOT_ALLOWED]: {
    message: '예약이 허용되지 않습니다.',
    statusCode: HttpStatus.FORBIDDEN,
  },
  [ErrorCode.SEAT_NOT_AVAILABLE]: {
    message: '이용 가능한 좌석이 없습니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.SEAT_ALREADY_BOOKED]: {
    message: '이미 예약된 좌석입니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.SEAT_NOT_FOUND]: {
    message: '좌석을 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.SEAT_ALREADY_CREATED]: {
    message: '좌석이 이미 생성되었습니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.CONCERT_NOT_FOUND]: {
    message: '콘서트를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.CONCERT_SAME_EXIST]: {
    message: '동일한 콘서트가 존재합니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.CONCERT_FULL]: {
    message: '콘서트가 매진되었습니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.CONCERT_DATE_NOT_FOUNT]: {
    message: '콘서트 날짜를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.CONCERT_DATE_SAME_EXIST]: {
    message: '동일한 콘서트 날짜가 존재합니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.CONCERT_CANCELED]: {
    message: '취소된 콘서트입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.USER_NOT_FOUND]: {
    message: '사용자를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.USER_ALREADY_EXISTS]: {
    message: '이미 존재하는 사용자입니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    message: '잘못된 인증 정보입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.INSUFFICIENT_POINTS]: {
    message: '포인트가 부족합니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.INVALID_POINT_AMOUNT]: {
    message: '유효하지 않은 포인트 금액입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.BAD_REQUEST]: {
    message: '잘못된 요청입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.NOT_FOUND]: {
    message: '요청한 리소스를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    message: '서버 내부 오류가 발생했습니다.',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.SERVICE_UNAVAILABLE]: {
    message: '서비스를 사용할 수 없습니다.',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  },
  [ErrorCode.OPTIMISTIC_LOCK_ERROR]: {
    message: '동시성 문제가 발생했습니다. 다시 시도해 주세요.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.CONCURRENT_MODIFICATION]: {
    message: '동시 수정으로 인한 충돌이 발생했습니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.VALIDATION_ERROR]: {
    message: '입력에 대한 검증에 실패했습니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.INVALID_INPUT]: {
    message: '유효하지 않은 입력입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.PERMISSION_DENIED]: {
    message: '권한이 없습니다.',
    statusCode: HttpStatus.FORBIDDEN,
  },

  [ErrorCode.RATE_LIMIT_EXCEEDED]: {
    message: '요청 한도를 초과했습니다.',
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
  },
  [ErrorCode.QUOTA_EXCEEDED]: {
    message: '할당량을 초과했습니다.',
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
  },
  [ErrorCode.QUEUE_ALREADY_EXISTS]: {
    message: '이미 요청한 유저가 존재하는 큐입니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.QUEUE_NOT_FOUND]: {
    message: '큐안에 유저를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.DISTRIBUTED_LOCK_FAILED]: {
    message: '분산 락 획득에 실패했습니다.',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};
