import {UserModel} from "../../domain/user-model";

export interface UserUseCase {
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserById(id: number): Promise<UserModel>;
    updateUserById(id: number, user: UserModel): Promise<UserModel>;
    deleteUserById(id: number): Promise<void>;
    getAllUsers(): Promise<UserModel[]>;
    createUser(user: UserModel): Promise<UserModel>;
}
