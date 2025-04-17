import { ProductModel } from "../../domain/product-model";
import { ProductGateway } from "../../use-cases/interfaces/gateway/product-gateway";
import {ProductNotFound} from "../../domain/erros/product-not-found";


export class ProductGatewayImpl implements ProductGateway {
    private readonly producst: ProductModel[] = [
        {
            "id": 1,
            "title": "Smartphone XYZ",
            "price": 999.99,
            "image": "https://example.com/image.jpg",
            "brand": "BrandName",
            "reviewScore": 4.5
        },
        {
            "id": 2,
            "title": "Laptop ABC",
            "price": 1999.99,
            "image": "https://example.com/image2.jpg",
            "brand": "BrandName",
            "reviewScore": 4.8
        },
        {
            "id": 3,
            "title": "Tablet DEF",
            "price": 499.99,
            "image": "https://example.com/image3.jpg",
            "brand": "BrandName",
            "reviewScore": 4.2
        },
        {
            "id": 4,
            "title": "Smartwatch GHI",
            "price": 299.99,
            "image": "https://example.com/image4.jpg",
            "brand": "BrandName",
            "reviewScore": 4.7
        },
        {
            "id": 5,
            "title": "Headphones JKL",
            "price": 199.99,
            "image": "https://example.com/image5.jpg",
            "brand": "BrandName",
            "reviewScore": 4.3
        },
        {
            "id": 6,
            "title": "Gaming Console MNO",
            "price": 499.99,
            "image": "https://example.com/image6.jpg",
            "brand": "BrandName",
            "reviewScore": 4.9
        },
        {
            "id": 7,
            "title": "Camera PQR",
            "price": 799.99,
            "image": "https://example.com/image7.jpg",
            "brand": "BrandName",
            "reviewScore": 4.6
        },
        {
            "id": 8,
            "title": "Monitor STU",
            "price": 299.99,
            "image": "https://example.com/image8.jpg",
            "brand": "BrandName",
            "reviewScore": 4.4
        },
        {
            "id": 9,
            "title": "Keyboard VWX",
            "price": 99.99,
            "image": "https://example.com/image9.jpg",
            "brand": "BrandName",
            "reviewScore": 4.1
        },
        {
            "id": 10,
            "title": "Mouse YZ",
            "price": 49.99,
            "image": "https://example.com/image10.jpg",
            "brand": "BrandName",
            "reviewScore": 4.0
        }
    ];

    constructor() {}

    async listAllProducts(): Promise<ProductModel[]> {
        return this.producst
    }

    async getProductById(productId: number): Promise<ProductModel> {
        const product = this.producst.find(product => product.id === productId);
        return product;
    }

}
