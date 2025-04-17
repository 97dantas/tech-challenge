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
exports.WishListUseCaseImpl = void 0;
const not_found_error_1 = require("../domain/erros/not-found-error");
const constants_error_1 = require("../helpers/constants-error");
const already_exits_error_1 = require("../domain/erros/already-exits-error");
class WishListUseCaseImpl {
    constructor(wishListRepository, productUseCase) {
        this.wishListRepository = wishListRepository;
        this.productUseCase = productUseCase;
    }
    getWishListById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wishListRepository.getWishListById(id);
            if (!result) {
                throw new Error('WishList not found');
            }
            return result;
        });
    }
    getWishListByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wishListRepository.getWishListByUserId(userId);
            if (!result) {
                throw new not_found_error_1.NotFoundError(constants_error_1.ERROR_MESSAGES.WISH_LIST_NOT_FOUND);
            }
            return result;
        });
    }
    createWishList(wishList) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishListByUserId = yield this.wishListRepository.getWishListByUserId(wishList.userId);
            if (wishListByUserId) {
                throw new already_exits_error_1.AlreadyExistsError(constants_error_1.ERROR_MESSAGES.WISH_LIST_ALREADY_EXISTS);
            }
            return yield this.wishListRepository.createWishList(wishList);
        });
    }
    addProductToWishList(wishListId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productUseCase.getProductById(productId);
            return yield this.wishListRepository.addProduct(wishListId, product);
        });
    }
    removeProductFromWishList(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wishListRepository.removeProductByProductId(userId, productId);
        });
    }
}
exports.WishListUseCaseImpl = WishListUseCaseImpl;
