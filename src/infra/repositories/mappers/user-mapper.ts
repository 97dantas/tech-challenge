import { UserEntity } from "../../database/postgres/entities/user";
import { UserModel } from "../../../domain/user-model";



export class UserMapper {

    static toDomain(userEntity: UserEntity): UserModel {
        return new UserModel(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password
        );
    }

    static toEntity(userModel: UserModel): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = userModel.id
        userEntity.name = userModel.name
        userEntity.email = userModel.email
        userEntity.password = userModel.password
        return userEntity;
    }
}
