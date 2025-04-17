"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMapper = void 0;
const product_1 = require("../../database/postgres/entities/product");
const product_model_1 = require("../../../domain/product-model");
class ProductMapper {
    static toDomain(product) {
        return new product_model_1.ProductModel(product.id, product.title, product.price, product.image, product.brand, product.reviewScore);
    }
    // Converte de ProductModel (modelo de domínio) para Product (entidade)
    static toEntity(productModel) {
        const product = new product_1.Product();
        product.id = productModel.id;
        product.title = productModel.title;
        product.price = productModel.price;
        product.image = productModel.image;
        product.brand = productModel.brand;
        product.reviewScore = productModel.reviewScore;
        return product;
    }
}
exports.ProductMapper = ProductMapper;
