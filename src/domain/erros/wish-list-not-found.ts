import { ERROR_MESSAGES } from "../../helpers/constants-error";

export class WishListNotFound extends Error {
    public readonly message: string;

    constructor() {
        super();
        this.message = ERROR_MESSAGES.WISH_LIST_NOT_FOUND;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
