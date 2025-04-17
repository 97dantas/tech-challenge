import bcrypt from 'bcryptjs';
import { IUserCrypt } from "../../use-cases/interfaces/IUserCrypt";

export class Cript implements IUserCrypt {
    constructor() {
    }

    encryptPassword(password:string): string {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    }
    comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}
