"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotFound = void 0;
const constants_error_1 = require("../../helpers/constants-error");
class ProductNotFound extends Error {
    constructor() {
        super();
        this.message = constants_error_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ProductNotFound = ProductNotFound;
