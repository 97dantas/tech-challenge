import { ERROR_MESSAGES } from "../../helpers/constants-error";

export class WishListProductAlreadyAdded extends Error {
    public readonly message: string;

    constructor() {
        super();
        this.message = ERROR_MESSAGES.WISH_LIST_PRODUCT_ALREADY_ADDED;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
