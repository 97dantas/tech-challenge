"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExists = void 0;
const constants_error_1 = require("../../helpers/constants-error");
class EmailAlreadyExists extends Error {
    constructor() {
        super();
        this.message = constants_error_1.ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.EmailAlreadyExists = EmailAlreadyExists;
