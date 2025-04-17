"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const already_exits_error_1 = require("../../domain/erros/already-exits-error");
const not_found_error_1 = require("../../domain/erros/not-found-error");
const email_already_exists_1 = require("../../domain/erros/email-already-exists");
const http_status_1 = __importDefault(require("http-status"));
function errorHandler(err, req, res, next) {
    const errorMap = new Map([
        [already_exits_error_1.AlreadyExistsError, http_status_1.default.CONFLICT],
        [email_already_exists_1.EmailAlreadyExists, http_status_1.default.CONFLICT],
        [not_found_error_1.NotFoundError, http_status_1.default.NOT_FOUND],
    ]);
    const status = errorMap.get(err.constructor) || 500;
    const errorResponse = {
        error: err.name || "InternalServerError",
        message: err.message || "An unexpected error occurred.",
    };
    res.status(status).json(errorResponse);
}
exports.errorHandler = errorHandler;
