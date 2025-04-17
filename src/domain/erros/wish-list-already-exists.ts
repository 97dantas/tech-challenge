import { ERROR_MESSAGES } from "../../helpers/constants-error";

export class WishListAlreadyExists extends Error {
    public readonly message: string;

    constructor() {
        super();
        this.message = ERROR_MESSAGES.WISH_LIST_ALREADY_EXISTS;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
