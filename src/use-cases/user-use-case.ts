import { UserModel } from "../domain/user-model";
import { UserRepository } from "./interfaces/repositories/user-repository";
import { UserUseCase } from "./interfaces/user-user-case";
import {IUserCrypt} from "./interfaces/IUserCrypt";
import {EmailAlreadyExists} from "../domain/erros/email-already-exists";

export class UserUseCaseImpl implements UserUseCase {

    constructor(
        private userRepository: UserRepository,
        private cript: IUserCrypt
    ) {}

    getUserByEmail(email: string): Promise<UserModel | null> {
        return this.userRepository.getByEmail(email)
    }
    getUserById(id: number): Promise<UserModel> {
        return this.userRepository.getById(id)
    }
    updateUserById(id: number, user: UserModel): Promise<UserModel> {
        return this.userRepository.update(id, user)
    }
    deleteUserById(id: number) : Promise<void> {
        return this.userRepository.delete(id);
    }

    async getAllUsers(): Promise<UserModel[]> {
        const result = await this.userRepository.getAll()
        return result
    }

    async createUser(user: UserModel): Promise<UserModel> {
        const userByEmail = await this.getUserByEmail(user.email)
        if (userByEmail) {
            throw new EmailAlreadyExists()
        }
        user.password = await this.cript.encryptPassword(user.password)
        const result = await this.userRepository.create(user)
        return result
    }
}
