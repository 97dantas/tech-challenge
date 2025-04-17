import { ProductModel } from "../../domain/product-model";
import { WishListModel } from "../../domain/wish-list-model";


export interface WishListUseCase {
    getWishListById(id: number): Promise<WishListModel>;
    getWishListByUserId(userId: number): Promise<WishListModel>;
    createWishList(wishList: WishListModel): Promise<WishListModel>;
    addProductToWishList(userId: number, producId: number): Promise<WishListModel>;
    removeProductFromWishList(userId: number, productId: string): Promise<WishListModel>;
}
