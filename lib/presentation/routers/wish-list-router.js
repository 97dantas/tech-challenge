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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRouter = void 0;
const express_1 = require("express");
const wish_list_model_1 = require("../../domain/wish-list-model");
const http_status_1 = __importDefault(require("http-status"));
const WishListRouter = (wishListUseCase) => {
    const router = (0, express_1.Router)();
    router.get('', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const wishList = yield wishListUseCase.getWishListByUserId(Number(req.headers.userId));
            res.status(http_status_1.default.OK).json(wishList);
        }
        catch (error) {
            next(error);
        }
    }));
    router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.headers.userId;
            const wishList = wish_list_model_1.WishListModel.create(Number(userId));
            const createdWishList = yield wishListUseCase.createWishList(wishList);
            res.status(http_status_1.default.CREATED).json(createdWishList);
        }
        catch (error) {
            next(error);
        }
    }));
    router.post("/products/:productId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const { userId } = req.headers;
            const updatedWishList = yield wishListUseCase.addProductToWishList(Number(userId), Number(productId));
            res.status(http_status_1.default.OK).json(updatedWishList);
        }
        catch (error) {
            next(error);
        }
    }));
    router.delete("/products/:productId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const { userId } = req.headers;
            const updatedWishList = yield wishListUseCase.removeProductFromWishList(Number(userId), productId);
            res.status(http_status_1.default.OK).json(updatedWishList);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
};
exports.WishListRouter = WishListRouter;
