import {IJWTService} from "../../use-cases/interfaces/JWTService";

export class AuthMiddleware {
    private jwtService: IJWTService

    constructor(jwtService: IJWTService) {
        this.jwtService = jwtService;
    }

    authenticate(req: any, res: any, next: any) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send('Access denied. No token provided.');
        }

        const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
        try {
            const decoded = this.jwtService.decodeToken(token);
            req.headers.userId = decoded.id;
            next();
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
    }
}
