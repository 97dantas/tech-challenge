import { NAME_ERRORS } from "../../helpers/name-erros";

export class AlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = NAME_ERRORS.ALREADY_EXISTS;
    }
}
