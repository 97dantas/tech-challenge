import { ProductModel } from "../../../domain/product-model";

export interface ProductRepository {
    createProduct(product: ProductModel): Promise<void>;
    deleteProduct(id: number): Promise<void>;
    updateProduct(id: number, product: ProductModel): Promise<void>;
    listAllProducts(): Promise<ProductModel[]>;
}
