import { ProductModel } from "../../domain/product-model";

export interface ProductUseCase {
    createProduct(product: ProductModel): Promise<void>;
    deleteProduct(id: number): Promise<void>;
    updateProduct(id: number, product: ProductModel): Promise<void>;
    listAllProducts(): Promise<ProductModel[]>;
    getProductById(id: number): Promise<ProductModel | null>;
}
