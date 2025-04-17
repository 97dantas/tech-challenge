export class ProductModel {
    id: number;
    title: string;
    price: number;
    image: string;
    brand: string;
    reviewScore: number;

    constructor(
        id: number,
        title: string,
        price: number,
        image: string,
        brand: string,
        reviewScore: number
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.brand = brand;
        this.reviewScore = reviewScore;
    }
}