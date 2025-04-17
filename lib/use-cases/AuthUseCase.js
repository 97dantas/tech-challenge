"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
class AuthUseCase {
    constructor(userUseCase, cript, jwtService) {
        this.userUseCase = userUseCase;
        this.cript = cript;
        this.jwtService = jwtService;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userUseCase.getUserByEmail(email);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const isPasswordValid = this.cript.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }
            const token = this.jwtService.generateToken({ id: user.id, email: user.email });
            return token;
        });
    }
}
exports.AuthUseCase = AuthUseCase;
