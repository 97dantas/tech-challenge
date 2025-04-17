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
exports.CreateUsersTable1744809602962 = void 0;
class CreateUsersTable1744809602962 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE public.users (
              id serial4 NOT NULL,
              "name" varchar(255) NOT NULL,
              email varchar(255) NOT NULL,
              "password" varchar NULL,
              CONSTRAINT users_email_key UNIQUE (email),
              CONSTRAINT users_pkey PRIMARY KEY (id)
            )
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DROP TABLE public.users
        `);
        });
    }
}
exports.CreateUsersTable1744809602962 = CreateUsersTable1744809602962;
