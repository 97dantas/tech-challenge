import {IJWTService} from "../../use-cases/interfaces/JWTService";
import { sign, verify } from 'jsonwebtoken'

export class JWTService implements IJWTService {
    private secretKey: string;
    private expiresIn: number;

    constructor(secretKey: string, expiresIn: number) {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    generateToken(payload: object): string {
        return sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    decodeToken(token: string): any {
        return verify(token, this.secretKey)
    }
}
