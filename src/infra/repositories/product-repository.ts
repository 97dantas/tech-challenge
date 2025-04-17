import { Repository } from "typeorm";
import { ProductRepository } from "../../use-cases/interfaces/repositories/product-repository";
import { ProductModel } from "../../domain/product-model";
import { Product } from "../database/postgres/entities/product";

export class ProductRepositoryImpl implements ProductRepository {
    private productRepository: Repository<Product>;

    constructor(productRepository: Repository<Product>) {
        this.productRepository = productRepository;
    }

    async createProduct(product: ProductModel): Promise<void> {
        await this.productRepository.save(product);
    }

    async deleteProduct(id: number): Promise<void> {
        await this.productRepository.delete({ id });
    }

    async updateProduct(id: number, product: ProductModel): Promise<void> {
        await this.productRepository.update({ id }, product);
    }

    async listAllProducts(): Promise<ProductModel[]> {
        const products = await this.productRepository.find();
        return products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            brand: product.brand,
            reviewScore: product.reviewScore,
        }));
    }

}
