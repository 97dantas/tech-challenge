"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    authenticate(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send('Access denied. No token provided.');
        }
        const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
        try {
            const decoded = this.jwtService.decodeToken(token);
            req.headers.userId = decoded.id;
            next();
        }
        catch (ex) {
            res.status(400).send('Invalid token.');
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
