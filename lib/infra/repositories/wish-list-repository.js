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
exports.WishListRepositoryImpl = void 0;
const wishi_list_1 = require("../database/postgres/entities/wishi-list");
const wish_list_mapper_1 = require("./mappers/wish-list-mapper");
const code_erros_1 = require("../../helpers/code-erros");
const wish_list_not_found_1 = require("../../domain/erros/wish-list-not-found");
const wish_list_already_exists_1 = require("../../domain/erros/wish-list-already-exists");
const already_exits_error_1 = require("../../domain/erros/already-exits-error");
const constants_error_1 = require("../../helpers/constants-error");
class WishListRepositoryImpl {
    constructor(wishListRepository, caching) {
        this.wishListRepository = wishListRepository;
        this.caching = caching;
    }
    getOneWishiList(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.wishListRepository.findOne({
                where: Object.assign({}, query),
                relations: ["products"],
            });
        });
    }
    addProduct(userId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield this.getWishListByUserId(userId);
                yield this.wishListRepository
                    .createQueryBuilder()
                    .relation(wishi_list_1.WishList, "products")
                    .of(id)
                    .add(product);
                const wishList = yield this.getOneWishiList({ id });
                this.caching.set(`wishList:user:${userId}`, wishList);
                return wish_list_mapper_1.WishListMapper.toDomain(wishList);
            }
            catch (e) {
                if (e.constraint === code_erros_1.CODE_ERRORS.WISH_LIST_PRODUCT_DUPLICATED) {
                    throw new already_exits_error_1.AlreadyExistsError(constants_error_1.ERROR_MESSAGES.WISH_LIST_PRODUCT_ALREADY_ADDED);
                }
                throw e;
            }
        });
    }
    removeProductByProductId(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield this.getWishListByUserId(userId);
                yield this.wishListRepository
                    .createQueryBuilder()
                    .relation(wishi_list_1.WishList, "products")
                    .of(id)
                    .remove(productId);
                const wishList = yield this.getOneWishiList({ id });
                if (!wishList) {
                    throw new wish_list_not_found_1.WishListNotFound();
                }
                this.caching.set(`wishList:user:${userId}`, wishList);
                return wish_list_mapper_1.WishListMapper.toDomain(wishList);
            }
            catch (e) {
                throw e;
            }
        });
    }
    createWishList(wishList) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.wishListRepository.save(wishList);
            }
            catch (e) {
                if (e.constraint === code_erros_1.CODE_ERRORS.WISH_LIST_ALREADY_EXISTS) {
                    throw new wish_list_already_exists_1.WishListAlreadyExists();
                }
                throw e;
            }
        });
    }
    getWishListById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.caching.get(`wishList:${id}`);
            if (resp) {
                return wish_list_mapper_1.WishListMapper.toDomain(resp);
            }
            const result = yield this.wishListRepository.findOne({ where: { id }, relations: ["products"] });
            if (!result) {
                return null;
            }
            return wish_list_mapper_1.WishListMapper.toDomain(result);
        });
    }
    getWishListByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedWishList = yield this.caching.get(`wishList:user:${userId}`);
            if (cachedWishList) {
                return wish_list_mapper_1.WishListMapper.toDomain(cachedWishList);
            }
            const wishList = yield this.getOneWishiList({ userId });
            if (!wishList) {
                return null;
            }
            const wishiListModel = wish_list_mapper_1.WishListMapper.toDomain(wishList);
            this.caching.set(`wishList:user:${userId}`, wishiListModel);
            return wishiListModel;
        });
    }
}
exports.WishListRepositoryImpl = WishListRepositoryImpl;
