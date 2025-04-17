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
exports.RedisCache = void 0;
class RedisCache {
    constructor(client) {
        this.client = client;
    }
    set(key, value, expirationInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedValue = JSON.stringify(value);
            if (expirationInSeconds) {
                yield this.client.set(key, serializedValue, { EX: expirationInSeconds });
            }
            else {
                yield this.client.set(key, serializedValue);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.client.get(key);
            return value ? JSON.parse(value) : null;
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
}
exports.RedisCache = RedisCache;
