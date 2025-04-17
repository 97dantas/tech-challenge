import { IUserCrypt } from "./interfaces/IUserCrypt";
import {IJWTService } from "./interfaces/JWTService";
import {UserUseCase} from "./interfaces/user-user-case";

export class AuthUseCase {
    constructor(
        private userUseCase: UserUseCase,
        private cript: IUserCrypt,
        private jwtService: IJWTService
    ) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.userUseCase.getUserByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = this.cript.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = this.jwtService.generateToken({ id: user.id, email: user.email });
        return token;
    }
}
