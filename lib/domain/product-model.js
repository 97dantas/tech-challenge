"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
class ProductModel {
    constructor(id, title, price, image, brand, reviewScore) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.brand = brand;
        this.reviewScore = reviewScore;
    }
}
exports.ProductModel = ProductModel;
