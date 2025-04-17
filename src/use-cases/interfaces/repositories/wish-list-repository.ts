import { WishListModel } from "../../../domain/wish-list-model";
import { ProductModel } from "../../../domain/product-model";

export interface WishListRepository {
    getWishListById(id: number): Promise<WishListModel | null>;
    getWishListByUserId(userId: number): Promise<WishListModel | null>;
    createWishList(wishList: WishListModel): Promise<WishListModel>;
    addProduct(wishListId: number, product: ProductModel): Promise<WishListModel>;
    removeProductByProductId(userId: number, productId: string): Promise<WishListModel>;
}
