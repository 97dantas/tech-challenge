import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("users")
@Index(["email"], { unique: true })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;
}
