export interface IJWTService {
    generateToken(payload: object): string;
    decodeToken(token: string): any;
}
