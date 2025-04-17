import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user";
import { WishList } from "./entities/wishi-list";
import { Product } from "./entities/product";
import 'dotenv/config'

export default new DataSource({
    logging: true,
    type: "postgres",
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || "5432", 10),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [UserEntity, WishList, Product],
    migrations: ['src/infra/database/postgres/migrations/*.ts'],
}).initialize()