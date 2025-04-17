import { Router, Request, Response } from 'express';
import { AuthUseCase } from '../../use-cases/AuthUseCase';

export default function AuthRouter(authUseCase: AuthUseCase): Router {
    const router = Router();

    router.post('/login', async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const token = await authUseCase.login(email, password);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    });

    return router;
}
