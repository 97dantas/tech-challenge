import { MigrationInterface, QueryRunner } from "typeorm";

export class WishListProducts1744809972067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.wish_list_products (
                wish_list_id int4 NOT NULL,
                product_id int4 NOT NULL,
                CONSTRAINT wish_list_products_pkey PRIMARY KEY (wish_list_id, product_id)
            );
        `);

        await queryRunner.query(`
            ALTER TABLE public.wish_list_products
            ADD CONSTRAINT wish_list_products_product_id_fkey
            FOREIGN KEY (product_id) REFERENCES public.products(id);
        `);

        await queryRunner.query(`
            ALTER TABLE public.wish_list_products
            ADD CONSTRAINT wish_list_products_wish_list_id_fkey
            FOREIGN KEY (wish_list_id) REFERENCES public.wish_lists(id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.wish_list_products
            DROP CONSTRAINT wish_list_products_wish_list_id_fkey;
        `);

        await queryRunner.query(`
            ALTER TABLE public.wish_list_products
            DROP CONSTRAINT wish_list_products_product_id_fkey;
        `);

        await queryRunner.query(`
            DROP TABLE public.wish_list_products;
        `);
    }

}
