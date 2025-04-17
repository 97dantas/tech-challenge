"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListAlreadyExists = void 0;
const constants_error_1 = require("../../helpers/constants-error");
class WishListAlreadyExists extends Error {
    constructor() {
        super();
        this.message = constants_error_1.ERROR_MESSAGES.WISH_LIST_ALREADY_EXISTS;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.WishListAlreadyExists = WishListAlreadyExists;
