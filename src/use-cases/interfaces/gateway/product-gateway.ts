import { ProductModel } from "../../../domain/product-model";

export interface ProductGateway {
    listAllProducts(): Promise<ProductModel[]>;
    getProductById(productId: number): Promise<ProductModel | null>;
}
