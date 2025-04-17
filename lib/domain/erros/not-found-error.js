"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const name_erros_1 = require("../../helpers/name-erros");
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = name_erros_1.NAME_ERRORS.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
