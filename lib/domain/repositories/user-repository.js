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
class UserRepositoryImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getAll', this.userRepository.find().then(console.log).catch(console.error));
            return yield this.userRepository.find();
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.userRepository.create(user);
            return yield this.userRepository.save(newUser);
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.getById(id);
            if (!existingUser) {
                return null;
            }
            const updatedUser = this.userRepository.merge(existingUser, user);
            return yield this.userRepository.save(updatedUser);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
