import { Repository } from "typeorm";
import { WishListRepository } from "../../use-cases/interfaces/repositories/wish-list-repository";
import { WishListModel } from "../../domain/wish-list-model";
import { ProductModel } from "../../domain/product-model";
import { WishList } from "../database/postgres/entities/wishi-list";
import { WishListMapper} from "./mappers/wish-list-mapper";
import { CODE_ERRORS } from "../../helpers/code-erros";
import { WishListProductAlreadyAdded } from "../../domain/erros/wish-list-product-already-added";
import { WishListNotFound } from "../../domain/erros/wish-list-not-found";
import { WishListAlreadyExists } from "../../domain/erros/wish-list-already-exists";
import { ICaching } from "../database/redis/ICaching";
import e from "express";
import {AlreadyExistsError} from "../../domain/erros/already-exits-error";
import {ERROR_MESSAGES} from "../../helpers/constants-error";

export class WishListRepositoryImpl implements WishListRepository {
    private wishListRepository: Repository<WishList>;
    private caching: ICaching<WishList>

    constructor(wishListRepository: Repository<WishList>, caching: ICaching<WishList>) {
        this.wishListRepository = wishListRepository;
        this.caching = caching;
    }

    private async getOneWishiList(query: object): Promise<WishList> {
        return this.wishListRepository.findOne({
            where: { ...query },
            relations: ["products"],
        })
    }

    async addProduct(userId: number, product: ProductModel): Promise<WishListModel> {
        try {

            const { id } = await this.getWishListByUserId(userId)

            await this.wishListRepository
                .createQueryBuilder()
                .relation(WishList, "products")
                .of(id)
                .add(product);

            const wishList = await this.getOneWishiList({ id })

            this.caching.set(`wishList:user:${userId}`, wishList)
            return WishListMapper.toDomain(wishList)
        } catch (e) {
            if (e.constraint === CODE_ERRORS.WISH_LIST_PRODUCT_DUPLICATED) {
                throw new AlreadyExistsError(ERROR_MESSAGES.WISH_LIST_PRODUCT_ALREADY_ADDED)
            }
            throw e
        }
    }
    async removeProductByProductId(userId: number, productId: string): Promise<WishListModel> {
        try {
            const { id } = await this.getWishListByUserId(userId)

            await this.wishListRepository
                .createQueryBuilder()
                .relation(WishList, "products")
                .of(id)
                .remove(productId);

            const wishList = await this.getOneWishiList({ id })

            if (!wishList) {
                throw new WishListNotFound();
            }

            this.caching.set(`wishList:user:${userId}`, wishList)
            return WishListMapper.toDomain(wishList);
        } catch (e) {
            throw e;
        }
    }

    async createWishList(wishList: WishListModel): Promise<WishListModel> {
        try {
            return await this.wishListRepository.save(wishList);
        } catch (e) {
            if (e.constraint === CODE_ERRORS.WISH_LIST_ALREADY_EXISTS) {
                throw new WishListAlreadyExists()
            }
            throw e
        }
    }

    async getWishListById(id: number): Promise<WishListModel | null> {
        const resp = await this.caching.get(`wishList:${id}`)
        if (resp) {
            return WishListMapper.toDomain(resp)
        }
        const result = await this.wishListRepository.findOne({ where: { id }, relations: ["products"] })

        if(!result) {
            return null
        }

        return WishListMapper.toDomain(result)
    }

    async getWishListByUserId(userId: number): Promise<WishListModel | null> {
        const cachedWishList = await this.caching.get(`wishList:user:${userId}`);
        if (cachedWishList) {
            return WishListMapper.toDomain(cachedWishList);
        }

        const wishList = await this.getOneWishiList({ userId })

        if (!wishList) {
            return null
        }

        const wishiListModel = WishListMapper.toDomain(wishList)

        this.caching.set(`wishList:user:${userId}`, wishiListModel);
        return wishiListModel
    }
}
