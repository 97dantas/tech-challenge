import { Request, Response, NextFunction } from "express";
import { AlreadyExistsError } from "../../domain/erros/already-exits-error";
import { NotFoundError } from "../../domain/erros/not-found-error";
import { EmailAlreadyExists } from "../../domain/erros/email-already-exists";
import statusCode from "http-status";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const errorMap = new Map([
        [AlreadyExistsError, statusCode.CONFLICT],
        [EmailAlreadyExists, statusCode.CONFLICT],
        [NotFoundError, statusCode.NOT_FOUND],
    ]);

    const status = errorMap.get(err.constructor as any) || 500;
    const errorResponse = {
        error: err.name || "InternalServerError",
        message: err.message || "An unexpected error occurred.",
    };

    res.status(status).json(errorResponse);
}
