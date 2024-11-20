export class UpdateUserDto {
  constructor(
    readonly id: string,
    readonly nickname?: string,
    readonly email?: string,
    readonly password?: string,
  ) {}
}
