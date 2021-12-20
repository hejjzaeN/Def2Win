import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserModel } from './user.model';
import { AccessLevel } from 'src/const/db';

@Injectable()
export class UserService {
    constructor (@InjectModel(UserModel) private userModel: typeof UserModel) { }

    async create (user: UserModel) {
        try {
            user.JoinedOn = new Date();
            user.AccessLevel = AccessLevel.MEMBER
            user.Tokens = '1'
            const newUser = await this.userModel.create(user)
            return {message: `${newUser.Firstname} ${newUser.Surname} has been created`}
        }
        catch (err) {
            return {message: `Error - ${err}`}
        }
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

    async delete (id: number) {
        try {
            const rowsAffected = await this.userModel.destroy({where: {Id: id}})
            if (rowsAffected <= 0) {
                throw Error('invalid request')
            }
            return {message: 'The user has been deleted'}
        } catch (err) {
            return {message: `Error - ${err}`}
        }
    }
}
