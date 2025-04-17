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
exports.ProductUseCaseImpl = void 0;
const not_found_error_1 = require("../domain/erros/not-found-error");
const constants_error_1 = require("../helpers/constants-error");
class ProductUseCaseImpl {
    constructor(productRepository, productGateway) {
        this.productRepository = productRepository;
        this.productGateway = productGateway;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.createProduct(product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.deleteProduct(id);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.updateProduct(id, product);
        });
    }
    listAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.listAllProducts();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productGateway.getProductById(id);
            if (!product) {
                throw new not_found_error_1.NotFoundError(constants_error_1.ERROR_MESSAGES.PRODUCT_NOT_FOUND);
            }
            yield this.createProduct(product);
            return product;
        });
    }
}
exports.ProductUseCaseImpl = ProductUseCaseImpl;
