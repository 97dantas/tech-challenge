"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModel = void 0;
class WishListModel {
    constructor(id, userId, products) {
        this.id = id;
        this.userId = userId;
        this.products = products;
    }
    static create(id) {
        return new WishListModel(Number(), id, []);
    }
}
exports.WishListModel = WishListModel;
