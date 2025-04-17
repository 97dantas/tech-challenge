import { ProductModel } from "./product-model";

export class WishListModel {
    id: number;
    userId: number;
    products: ProductModel[];

    constructor(id: number, userId: number, products: ProductModel[]) {
        this.id = id;
        this.userId = userId;
        this.products = products;
    }


    static create(id: number) {
        return new WishListModel(Number(), id, []);
    }
}
