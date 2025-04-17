import { ERROR_MESSAGES } from "../../helpers/constants-error";

export class EmailAlreadyExists extends Error {
    public readonly message: string;

    constructor() {
        super();
        this.message = ERROR_MESSAGES.EMAIL_ALREADY_EXISTS
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
