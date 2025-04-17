import { MigrationInterface, QueryRunner } from "typeorm";

export class Products1744809750442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.products (
                id serial4 NOT NULL,
                title varchar(255) NOT NULL,
                price numeric(10, 2) NOT NULL,
                image text NULL,
                brand varchar(255) NULL,
                review_score numeric(3, 2) NULL,
                CONSTRAINT products_pkey PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE public.products
        `);
    }

}
