"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListProductAlreadyAdded = void 0;
const constants_error_1 = require("../../helpers/constants-error");
class WishListProductAlreadyAdded extends Error {
    constructor() {
        super();
        this.message = constants_error_1.ERROR_MESSAGES.WISH_LIST_PRODUCT_ALREADY_ADDED;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.WishListProductAlreadyAdded = WishListProductAlreadyAdded;
