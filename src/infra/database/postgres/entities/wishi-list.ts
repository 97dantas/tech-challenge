import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./product";

@Entity("wish_lists")
export class WishList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', type: "integer", nullable: false })
    userId: number;

    @ManyToMany(() => Product)
    @JoinTable({
        name: "wish_list_products",
        joinColumn: { name: "wish_list_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
    })
    products: Product[];
}