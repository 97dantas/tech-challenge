"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImpl = void 0;
class ProductRepositoryImpl {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.save(product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.delete({ id });
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.update({ id }, product);
        });
    }
    listAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.find();
            return products.map(product => ({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                brand: product.brand,
                reviewScore: product.reviewScore,
            }));
        });
    }
}
exports.ProductRepositoryImpl = ProductRepositoryImpl;
