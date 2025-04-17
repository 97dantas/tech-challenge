"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListNotFound = void 0;
const constants_error_1 = require("../../helpers/constants-error");
class WishListNotFound extends Error {
    constructor() {
        super();
        this.message = constants_error_1.ERROR_MESSAGES.WISH_LIST_NOT_FOUND;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.WishListNotFound = WishListNotFound;
