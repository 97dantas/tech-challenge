export interface IUserCrypt {
  encryptPassword(password: string): string;
  comparePassword(password: string, hash: string): boolean;
}
