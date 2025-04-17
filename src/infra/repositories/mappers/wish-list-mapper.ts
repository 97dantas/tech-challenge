import {WishList} from "../../database/postgres/entities/wishi-list";
import {WishListModel} from "../../../domain/wish-list-model";
import {ProductModel} from "../../../domain/product-model";
import {Product} from "../../database/postgres/entities/product";


export class WishListMapper {
    
    static toDomain(wishList: WishList): WishListModel {
        return new WishListModel(
            wishList.id,
            wishList.userId,
            wishList.products.map(product => new ProductModel(
                product.id,
                product.title,
                product.price,
                product.image,
                product.brand,
                product.reviewScore
            ))
        );
    }

    static toEntity(wishListModel: WishListModel): WishList {
        const wishList = new WishList();
        wishList.id = wishListModel.id;
        wishList.userId = wishListModel.userId;
        wishList.products = wishListModel.products.map(productModel => {
            const product = new Product();
            product.id = productModel.id;
            product.title = productModel.title;
            product.price = productModel.price;
            product.image = productModel.image;
            product.brand = productModel.brand;
            product.reviewScore = productModel.reviewScore;
            return product;
        });
        return wishList;
    }
}
