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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const user_repository_1 = require("./infra/repositories/user-repository");
const user_router_1 = __importDefault(require("./presentation/routers/user-router"));
const user_use_case_1 = require("./use-cases/user-use-case");
const wishi_list_1 = require("./infra/database/postgres/entities/wishi-list");
const user_1 = require("./infra/database/postgres/entities/user");
const product_1 = require("./infra/database/postgres/entities/product");
const wish_list_repository_1 = require("./infra/repositories/wish-list-repository");
const wish_list_use_case_1 = require("./use-cases/wish-list-use-case");
const wish_list_router_1 = require("./presentation/routers/wish-list-router");
const product_gateway_1 = require("./infra/gateway/product-gateway");
const product_use_case_1 = require("./use-cases/product-use-case");
const product_repository_1 = require("./infra/repositories/product-repository");
const redis_1 = require("./infra/database/redis/redis");
const cript_1 = require("./infra/cript/cript");
const jwt_1 = require("./infra/cript/jwt");
const AuthUseCase_1 = require("./use-cases/AuthUseCase");
const auth_router_1 = __importDefault(require("./presentation/routers/auth-router"));
const auth_middleware_1 = require("./presentation/middleware/auth-middleware");
const data_source_1 = __importDefault(require("./infra/database/redis/data-source"));
const typeorm_1 = require("typeorm");
const error_handler_1 = require("./presentation/middleware/error-handler");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, data_source_1.default)();
    // const AppDataSource = PGDataSource
    const AppDataSource = new typeorm_1.DataSource({
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
    yield AppDataSource.initialize();
    const jwtService = new jwt_1.JWTService('your-secret-key', 10000);
    const authMiddleware = new auth_middleware_1.AuthMiddleware(jwtService);
    const userRepo = AppDataSource.getRepository(user_1.UserEntity);
    const cript = new cript_1.Cript();
    const userRepository = new user_repository_1.UserRepositoryImpl(userRepo);
    const userUseCase = new user_use_case_1.UserUseCaseImpl(userRepository, cript);
    const authUseCase = new AuthUseCase_1.AuthUseCase(userUseCase, cript, jwtService);
    server_1.default.use('/auth', (0, auth_router_1.default)(authUseCase));
    const userMiddleWare = (0, user_router_1.default)(new user_use_case_1.UserUseCaseImpl(new user_repository_1.UserRepositoryImpl(AppDataSource.getRepository(user_1.UserEntity)), cript), authMiddleware);
    server_1.default.use("/user", userMiddleWare);
    const caching = new redis_1.RedisCache(client);
    const wishListRepository = new wish_list_repository_1.WishListRepositoryImpl(AppDataSource.getRepository(wishi_list_1.WishList), caching);
    const productRepository = new product_repository_1.ProductRepositoryImpl(AppDataSource.getRepository(product_1.Product));
    const productGateway = new product_gateway_1.ProductGatewayImpl();
    const productUseCase = new product_use_case_1.ProductUseCaseImpl(productRepository, productGateway);
    const wishListUseCase = new wish_list_use_case_1.WishListUseCaseImpl(wishListRepository, productUseCase);
    server_1.default.use("/wish-list", authMiddleware.authenticate.bind(authMiddleware), (0, wish_list_router_1.WishListRouter)(wishListUseCase));
    server_1.default.use(error_handler_1.errorHandler);
    server_1.default.listen(4000, () => console.log("Running on http://localhost:4000"));
}))();
