"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistsError = void 0;
const name_erros_1 = require("../../helpers/name-erros");
class AlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = name_erros_1.NAME_ERRORS.ALREADY_EXISTS;
    }
}
exports.AlreadyExistsError = AlreadyExistsError;
