"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const wishi_list_1 = require("./entities/wishi-list");
const product_1 = require("./entities/product");
require("dotenv/config");
exports.default = new typeorm_1.DataSource({
    logging: true,
    type: "postgres",
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || "5432", 10),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [user_1.UserEntity, wishi_list_1.WishList, product_1.Product],
    migrations: ['src/infra/database/postgres/migrations/*.ts'],
});
