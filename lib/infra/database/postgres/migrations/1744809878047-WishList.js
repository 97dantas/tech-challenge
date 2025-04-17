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
exports.WishList1744809878047 = void 0;
class WishList1744809878047 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE public.wish_lists (
                id serial4 NOT NULL,
                user_id int4 NOT NULL,
                CONSTRAINT wish_lists_pkey PRIMARY KEY (id),
                CONSTRAINT wish_lists_unique UNIQUE (user_id)
            );
        `);
            yield queryRunner.query(`
            ALTER TABLE public.wish_lists
            ADD CONSTRAINT wish_lists_user_id_fkey
            FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE public.wish_lists
            DROP CONSTRAINT wish_lists_user_id_fkey;
        `);
            yield queryRunner.query(`
            DROP TABLE public.wish_lists;
        `);
        });
    }
}
exports.WishList1744809878047 = WishList1744809878047;
