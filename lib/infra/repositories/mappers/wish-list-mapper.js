"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListMapper = void 0;
const wishi_list_1 = require("../../database/postgres/entities/wishi-list");
const wish_list_model_1 = require("../../../domain/wish-list-model");
const product_model_1 = require("../../../domain/product-model");
const product_1 = require("../../database/postgres/entities/product");
class WishListMapper {
    static toDomain(wishList) {
        return new wish_list_model_1.WishListModel(wishList.id, wishList.userId, wishList.products.map(product => new product_model_1.ProductModel(product.id, product.title, product.price, product.image, product.brand, product.reviewScore)));
    }
    static toEntity(wishListModel) {
        const wishList = new wishi_list_1.WishList();
        wishList.id = wishListModel.id;
        wishList.userId = wishListModel.userId;
        wishList.products = wishListModel.products.map(productModel => {
            const product = new product_1.Product();
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
exports.WishListMapper = WishListMapper;
