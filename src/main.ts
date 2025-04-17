import server from './server'
import "reflect-metadata";
import { UserRepositoryImpl } from './infra/repositories/user-repository'
import UserRouter from './presentation/routers/user-router'
import { UserUseCaseImpl } from './use-cases/user-use-case'
import { WishList } from './infra/database/postgres/entities/wishi-list'
import { UserEntity } from './infra/database/postgres/entities/user'
import { Product } from './infra/database/postgres/entities/product'
import { WishListRepositoryImpl } from './infra/repositories/wish-list-repository'
import { WishListUseCaseImpl } from './use-cases/wish-list-use-case'
import { WishListRouter } from './presentation/routers/wish-list-router'
import { ProductGatewayImpl } from './infra/gateway/product-gateway'
import { ProductUseCaseImpl } from './use-cases/product-use-case'
import { ProductRepositoryImpl } from './infra/repositories/product-repository'
import {  RedisClientType } from 'redis'
import { RedisCache } from "./infra/database/redis/redis";
import { Cript } from "./infra/cript/cript";
import { IUserCrypt } from "./use-cases/interfaces/IUserCrypt";
import { JWTService } from './infra/cript/jwt';
import { AuthUseCase } from './use-cases/AuthUseCase';
import AuthRouter from './presentation/routers/auth-router';
import { AuthMiddleware } from "./presentation/middleware/auth-middleware";
import PGDataSource from "./infra/database/postgres/data-source";
import RedisDataSource from "./infra/database/redis/data-source";
import {DataSource} from "typeorm";
import {errorHandler} from "./presentation/middleware/error-handler";
import {Router} from "express";

(async () => {
    const client: RedisClientType = await RedisDataSource()

    const AppDataSource = await PGDataSource

    const jwtService = new JWTService('your-secret-key', 10000);

    const authMiddleware = new AuthMiddleware(jwtService)

    const userRepo = AppDataSource.getRepository(UserEntity);

    const cript: IUserCrypt = new Cript()
    const userRepository = new UserRepositoryImpl(userRepo);
    const userUseCase = new UserUseCaseImpl(userRepository, cript);
    const authUseCase = new AuthUseCase(userUseCase, cript, jwtService);

    server.use('/auth', AuthRouter(authUseCase));

    const userMiddleWare = UserRouter(
        new UserUseCaseImpl(new UserRepositoryImpl(AppDataSource.getRepository(UserEntity)), cript),
        authMiddleware
    )

    server.use("/user", userMiddleWare)

    const caching = new RedisCache<WishList>(client);
    const wishListRepository = new WishListRepositoryImpl(AppDataSource.getRepository(WishList), caching);
    const productRepository = new ProductRepositoryImpl(AppDataSource.getRepository(Product));
    const productGateway = new ProductGatewayImpl();
    const productUseCase = new ProductUseCaseImpl(productRepository, productGateway);
    const wishListUseCase = new WishListUseCaseImpl(wishListRepository, productUseCase);

    server.use("/wish-list",
        authMiddleware.authenticate.bind(authMiddleware),
        WishListRouter(wishListUseCase),
    );

    server.use(errorHandler);
    server.listen(4000, () => console.log("Running on http://localhost:4000"))
})()
