"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cript = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Cript {
    constructor() {
    }
    encryptPassword(password) {
        const saltRounds = 10;
        const salt = bcryptjs_1.default.genSaltSync(saltRounds);
        return bcryptjs_1.default.hashSync(password, salt);
    }
    comparePassword(password, hash) {
        return bcryptjs_1.default.compareSync(password, hash);
    }
}
exports.Cript = Cript;
