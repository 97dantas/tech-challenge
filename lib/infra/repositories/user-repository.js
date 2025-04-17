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
exports.UserRepositoryImpl = void 0;
const email_already_exists_1 = require("../../domain/erros/email-already-exists");
const code_erros_1 = require("../../helpers/code-erros");
const user_mapper_1 = require("./mappers/user-mapper");
class UserRepositoryImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getByEmail(email) {
        return this.userRepository.findOneBy({ email }).then(user => {
            if (!user) {
                return null;
            }
            return user_mapper_1.UserMapper.toDomain(user);
        });
    }
    getById(id) {
        return this.userRepository.findOneBy({ id }).then(user => {
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user_mapper_1.UserMapper.toDomain(user);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find().then(users => {
                return users.map(user => user_mapper_1.UserMapper.toDomain(user));
            });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository
                .save(user_mapper_1.UserMapper.toEntity(user))
                .then(user_mapper_1.UserMapper.toDomain)
                .catch(error => {
                if (error.constraint === code_erros_1.CODE_ERRORS.EMAIL_ALREADY_EXISTS) {
                    throw new email_already_exists_1.EmailAlreadyExists();
                }
                throw error;
            });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update({ id }, user);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete({ id });
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
