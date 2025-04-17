import { ProductModel } from "../domain/product-model";
import { ProductGateway } from "./interfaces/gateway/product-gateway";
import { ProductRepository } from "./interfaces/repositories/product-repository";
import { ProductUseCase } from "./interfaces/product-use-case";
import {NotFoundError} from "../domain/erros/not-found-error";
import {ERROR_MESSAGES} from "../helpers/constants-error";

export class ProductUseCaseImpl implements ProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productGateway: ProductGateway

    ) {}

    async createProduct(product: ProductModel): Promise<void> {
        await this.productRepository.createProduct(product);
    }

    async deleteProduct(id: number): Promise<void> {
        await this.productRepository.deleteProduct(id);
    }

    async updateProduct(id: number, product: ProductModel): Promise<void> {
        await this.productRepository.updateProduct(id, product);
    }

    async listAllProducts(): Promise<ProductModel[]> {
        return await this.productRepository.listAllProducts();
    }

    async getProductById(id: number): Promise<ProductModel | null> {
        const product = await this.productGateway.getProductById(id)
        if (!product) {
            throw new NotFoundError(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
        }
        await this.createProduct(product)
        return product;
    }
}
