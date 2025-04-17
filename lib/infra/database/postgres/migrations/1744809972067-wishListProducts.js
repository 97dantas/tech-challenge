"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListProducts1744809972067 = void 0;
class WishListProducts1744809972067 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE public.wish_list_products (
                wish_list_id int4 NOT NULL,
                product_id int4 NOT NULL,
                CONSTRAINT wish_list_products_pkey PRIMARY KEY (wish_list_id, product_id)
            );
        `);
            yield queryRunner.query(`
            ALTER TABLE public.wish_list_products
            ADD CONSTRAINT wish_list_products_product_id_fkey
            FOREIGN KEY (product_id) REFERENCES public.products(id);
        `);
            yield queryRunner.query(`
            ALTER TABLE public.wish_list_products
            ADD CONSTRAINT wish_list_products_wish_list_id_fkey
            FOREIGN KEY (wish_list_id) REFERENCES public.wish_lists(id);
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE public.wish_list_products
            DROP CONSTRAINT wish_list_products_wish_list_id_fkey;
        `);
            yield queryRunner.query(`
            ALTER TABLE public.wish_list_products
            DROP CONSTRAINT wish_list_products_product_id_fkey;
        `);
            yield queryRunner.query(`
            DROP TABLE public.wish_list_products;
        `);
        });
    }
}
exports.WishListProducts1744809972067 = WishListProducts1744809972067;
