import express, {NextFunction} from 'express'
import { Request, Response } from 'express'

import status from "http-status";
import {UserUseCase} from "../../use-cases/interfaces/user-user-case";
import {AuthMiddleware} from "../middleware/auth-middleware";

export default function UserRouter(
    userUseCaseImpl: UserUseCase,
    authMiddleware: AuthMiddleware
) {
    const router = express.Router()

    router.get('/', authMiddleware.authenticate, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contacts = await userUseCaseImpl.getAllUsers()
            res.send(contacts)
        } catch (err) {
            next(err)
        }
    })

    router.get('/email/:email', authMiddleware.authenticate, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await userUseCaseImpl.getUserByEmail(req.params.email)
            res.status(status.OK).json(response)
        } catch (err) {
            next(err)
        }
    })

    router.get('/id/:id', authMiddleware.authenticate, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await userUseCaseImpl.getUserById(Number(req.params.id))
            res.status(status.OK).json(response)
        } catch (err) {
            next(err)
        }
    })

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await userUseCaseImpl.createUser(req.body)
            res.status(status.CREATED).json(response)
        } catch (err) {
            next(err)
        }
    })

    router.put('/id/:id', authMiddleware.authenticate, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await userUseCaseImpl.updateUserById(Number(req.params.id), req.body)
            res.status(status.OK).json(response)
        } catch (err) {
            next(err)
        }
    })

    router.delete('/id/:id', authMiddleware.authenticate, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await userUseCaseImpl.deleteUserById(Number(req.params.id))
            
            res.status(status.OK).json(response)
        } catch (err) {
            next(err)
        }
    })

    return router
}
