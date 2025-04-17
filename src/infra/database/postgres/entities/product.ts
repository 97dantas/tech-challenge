import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: "text", nullable: true })
    image: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    brand: string;

    @Column({ name: 'review_score', type: "numeric", precision: 3, scale: 2, nullable: true })
    reviewScore: number;
}