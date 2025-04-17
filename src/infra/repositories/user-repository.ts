import { Repository } from "typeorm";
import { UserRepository } from "../../use-cases/interfaces/repositories/user-repository";
import { UserModel } from "../../domain/user-model";

import { UserEntity } from "../database/postgres/entities/user";
import { EmailAlreadyExists } from "../../domain/erros/email-already-exists";
import { CODE_ERRORS } from "../../helpers/code-erros";
import { UserMapper } from "./mappers/user-mapper";

export class UserRepositoryImpl implements UserRepository {
    private userRepository: Repository<UserEntity>;

    constructor(userRepository: Repository<UserEntity>) {
        this.userRepository = userRepository;
    }


    getByEmail(email: string): Promise<UserModel | null> {
        return this.userRepository.findOneBy({ email }).then(user => {
            if (!user) {
                return null
            }
            return UserMapper.toDomain(user);
        })
    }

    getById(id: number): Promise<UserModel> {
        return this.userRepository.findOneBy({ id }).then(user => {
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return UserMapper.toDomain(user);
        });

    }

    async getAll(): Promise<UserModel[]> {
        return await this.userRepository.find().then(users => {
            return users.map(user => UserMapper.toDomain(user));
        })
    }

    async create(user: UserModel): Promise<UserModel> {
        return await this.userRepository
            .save(UserMapper.toEntity(user))
            .then(UserMapper.toDomain)
            .catch(error => {
                if (error.constraint === CODE_ERRORS.EMAIL_ALREADY_EXISTS) {
                    throw new EmailAlreadyExists();
                }
                throw error;
            });
    }

    async update(id: number, user: Partial<UserModel>): Promise<UserModel> {
        await this.userRepository.update({ id }, user);
        return this.getById(id);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete({ id });
    }
}
