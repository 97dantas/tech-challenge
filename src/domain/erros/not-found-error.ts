import { NAME_ERRORS } from "../../helpers/name-erros";

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = NAME_ERRORS.NOT_FOUND;
    }
}
