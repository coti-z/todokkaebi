export enum TokenTypeEnum {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export interface CreateJwtParam {
  userId: string;
}
