import { MigrationInterface, QueryRunner } from "typeorm";

export class WishList1744809878047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.wish_lists (
                id serial4 NOT NULL,
                user_id int4 NOT NULL,
                CONSTRAINT wish_lists_pkey PRIMARY KEY (id),
                CONSTRAINT wish_lists_unique UNIQUE (user_id)
            );
        `);

        await queryRunner.query(`
            ALTER TABLE public.wish_lists
            ADD CONSTRAINT wish_lists_user_id_fkey
            FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.wish_lists
            DROP CONSTRAINT wish_lists_user_id_fkey;
        `);

        await queryRunner.query(`
            DROP TABLE public.wish_lists;
        `);
    }

}
