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
exports.UserUseCaseImpl = void 0;
const email_already_exists_1 = require("../domain/erros/email-already-exists");
class UserUseCaseImpl {
    constructor(userRepository, cript) {
        this.userRepository = userRepository;
        this.cript = cript;
    }
    getUserByEmail(email) {
        return this.userRepository.getByEmail(email);
    }
    getUserById(id) {
        return this.userRepository.getById(id);
    }
    updateUserById(id, user) {
        return this.userRepository.update(id, user);
    }
    deleteUserById(id) {
        return this.userRepository.delete(id);
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.getAll();
            return result;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userByEmail = yield this.getUserByEmail(user.email);
            if (userByEmail) {
                throw new email_already_exists_1.EmailAlreadyExists();
            }
            user.password = yield this.cript.encryptPassword(user.password);
            const result = yield this.userRepository.create(user);
            return result;
        });
    }
}
exports.UserUseCaseImpl = UserUseCaseImpl;
