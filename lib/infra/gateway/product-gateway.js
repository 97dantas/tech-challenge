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
exports.ProductGatewayImpl = void 0;
class ProductGatewayImpl {
    constructor() {
        this.producst = [
            {
                "id": 1,
                "title": "Smartphone XYZ",
                "price": 999.99,
                "image": "https://example.com/image.jpg",
                "brand": "BrandName",
                "reviewScore": 4.5
            },
            {
                "id": 2,
                "title": "Laptop ABC",
                "price": 1999.99,
                "image": "https://example.com/image2.jpg",
                "brand": "BrandName",
                "reviewScore": 4.8
            },
            {
                "id": 3,
                "title": "Tablet DEF",
                "price": 499.99,
                "image": "https://example.com/image3.jpg",
                "brand": "BrandName",
                "reviewScore": 4.2
            },
            {
                "id": 10,
                "title": "Tablet DEF israel update",
                "price": 999.99,
                "image": "https://example.com/image3.png",
                "brand": "BrandName",
                "reviewScore": 4.2
            }
        ];
    }
    listAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.producst;
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.producst.find(product => product.id === productId);
            return product;
        });
    }
}
exports.ProductGatewayImpl = ProductGatewayImpl;
