import {Router, Request, Response, NextFunction} from "express";
import { WishListModel } from "../../domain/wish-list-model";
import status from "http-status";
import { WishListUseCase } from "../../use-cases/interfaces/wish-list-use-case";

export const WishListRouter = (wishListUseCase: WishListUseCase): Router => {
    const router = Router();

    router.get('', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const wishList = await wishListUseCase.getWishListByUserId(Number(req.headers.userId));
            res.status(status.OK).json(wishList);
        } catch (error) {
            next(error)
        }
    })

    router.post("/", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: any = req.headers.userId;
            const wishList: WishListModel = WishListModel.create(Number(userId));
            const createdWishList = await wishListUseCase.createWishList(wishList);
            res.status(status.CREATED).json(createdWishList);
        } catch (error) {
            next(error)
        }
    });

    router.post("/products/:productId", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const { userId } = req.headers
            const updatedWishList = await wishListUseCase.addProductToWishList(Number(userId), Number(productId));
            res.status(status.OK).json(updatedWishList);
        } catch (error) {
            next(error)
        }
    });

    router.delete("/products/:productId", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const { userId } = req.headers
            const updatedWishList = await wishListUseCase.removeProductFromWishList(Number(userId), productId);
            res.status(status.OK).json(updatedWishList);
        } catch (error) {
            next(error)
        }
    });

    return router;
};
