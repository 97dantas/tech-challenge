"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_1 = require("../../database/postgres/entities/user");
const user_model_1 = require("../../../domain/user-model");
class UserMapper {
    static toDomain(userEntity) {
        return new user_model_1.UserModel(userEntity.id, userEntity.name, userEntity.email, userEntity.password);
    }
    static toEntity(userModel) {
        const userEntity = new user_1.UserEntity();
        userEntity.id = userModel.id;
        userEntity.name = userModel.name;
        userEntity.email = userModel.email;
        userEntity.password = userModel.password;
        return userEntity;
    }
}
exports.UserMapper = UserMapper;
