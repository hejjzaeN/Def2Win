import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor (@InjectModel(UserModel) private userModel: typeof UserModel) { }

    async create (user: UserModel) {
        return await this.userModel.create(user)
    }

    async readAll () {
        return await this.userModel.findAll()
    }

    async read (id: number) {
        return await this.userModel.findByPk(id)
    }

    async update (id: number, user: UserModel) {
        return await this.userModel.update(user, {where: {Id: id}})
    }
}
