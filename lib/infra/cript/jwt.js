"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JWTService {
    constructor(secretKey, expiresIn) {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }
    generateToken(payload) {
        return (0, jsonwebtoken_1.sign)(payload, this.secretKey, { expiresIn: this.expiresIn });
    }
    decodeToken(token) {
        return (0, jsonwebtoken_1.verify)(token, this.secretKey);
    }
}
exports.JWTService = JWTService;
