import { UserModel } from "../../../domain/user-model";

export interface UserRepository {
    getAll(): Promise<UserModel[]>;
    getById(id: number): Promise<UserModel>;
    getByEmail(email: string): Promise<UserModel | null>;
    create(user: UserModel): Promise<UserModel>;
    update(id: number, user: Partial<UserModel>): Promise<UserModel>;
    delete(id: number): Promise<void>;
}
