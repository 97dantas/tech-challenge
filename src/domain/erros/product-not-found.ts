import { ERROR_MESSAGES } from "../../helpers/constants-error";

export class ProductNotFound extends Error {
    public readonly message: string;

    constructor() {
        super();
        this.message = ERROR_MESSAGES.PRODUCT_NOT_FOUND
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
