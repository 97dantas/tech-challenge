import { WishListRepository } from "./interfaces/repositories/wish-list-repository";
import { WishListUseCase } from "./interfaces/wish-list-use-case";
import { WishListModel } from "../domain/wish-list-model";
import { ProductUseCase } from "./interfaces/product-use-case";
import {NotFoundError} from "../domain/erros/not-found-error";
import {ERROR_MESSAGES} from "../helpers/constants-error";
import {AlreadyExistsError} from "../domain/erros/already-exits-error";

export class WishListUseCaseImpl implements WishListUseCase {
    private wishListRepository: WishListRepository
    private productUseCase: ProductUseCase

    constructor(wishListRepository: WishListRepository, productUseCase: ProductUseCase) {
        this.wishListRepository = wishListRepository;
        this.productUseCase = productUseCase;
    }

    async getWishListById(id: number): Promise<WishListModel> {
        const result = await this.wishListRepository.getWishListById(id);
        if (!result) {
            throw new Error('WishList not found');
        }
        return result;
    }

    async getWishListByUserId(userId: number): Promise<WishListModel> {
        const result = await this.wishListRepository.getWishListByUserId(userId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.WISH_LIST_NOT_FOUND);
        }
        return result;
    }

    async createWishList(wishList: WishListModel): Promise<WishListModel> {
        const wishListByUserId = await this.wishListRepository.getWishListByUserId(wishList.userId);
        if (wishListByUserId) {
            throw new AlreadyExistsError(ERROR_MESSAGES.WISH_LIST_ALREADY_EXISTS)
        }
        return await this.wishListRepository.createWishList(wishList);
    }

    async addProductToWishList(wishListId: number, productId: number): Promise<WishListModel> {

        const product = await this.productUseCase.getProductById(productId)

        return await this.wishListRepository.addProduct(wishListId, product)
    }

    async removeProductFromWishList(userId: number, productId: string): Promise<WishListModel> {
        return await this.wishListRepository.removeProductByProductId(userId, productId);
    }

}
