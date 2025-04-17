import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1744809602962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.users (
              id serial4 NOT NULL,
              "name" varchar(255) NOT NULL,
              email varchar(255) NOT NULL,
              "password" varchar NULL,
              CONSTRAINT users_email_key UNIQUE (email),
              CONSTRAINT users_pkey PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE public.users
        `);
    }

}
