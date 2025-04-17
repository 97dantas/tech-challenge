import {Product} from "../../database/postgres/entities/product";
import {ProductModel} from "../../../domain/product-model";

export class ProductMapper {
    
    static toDomain(product: Product): ProductModel {
        return new ProductModel(
            product.id,
            product.title,
            product.price,
            product.image,
            product.brand,
            product.reviewScore
        );
    }

    static toEntity(productModel: ProductModel): Product {
        const product = new Product();
        product.id = productModel.id;
        product.title = productModel.title;
        product.price = productModel.price;
        product.image = productModel.image;
        product.brand = productModel.brand;
        product.reviewScore = productModel.reviewScore;
        return product;
    }
}
