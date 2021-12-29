import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserModel } from './user.model';
import { AccessService } from 'src/access/access.service';
import { ErrorDescription } from 'src/const/errors';
import { DBChange } from 'src/const/db';

@Injectable()
export class UserService {
    constructor (
        @InjectModel(UserModel) private userModel: typeof UserModel,
        private accessService: AccessService
    ) { }

    async readAll () {
        return await this.userModel.findAll()
    }

    async read (id: number) {
        const user = await this.userModel.findByPk(id, {raw: true})
        if (!user) {
            throw new HttpException(ErrorDescription.ERR_USERS_READ_NO_EXIST, HttpStatus.FORBIDDEN)
        }

        return user
    }

    async readByEmail (email: string) {
        return await this.userModel.findOne({where: {email}, raw: true})
    }

    async update (payLoad: any, id: number, userData: UserModel) {
        const hasAccess = await this.accessService.validate(payLoad, id)
        if (hasAccess === DBChange.FORBIDDEN) {
            throw new HttpException(ErrorDescription.ERR_ACCESS_NOT_ALLOWED, HttpStatus.FORBIDDEN)
        } else if (hasAccess === DBChange.PARTIALLY_ALLOWED) {
            const updates = Object.keys(userData)
            const allowedUpdates = ['firstname', 'surname', 'email', 'password', 'dob', 'resetedOn', 'avatarPath']
            const isValidOperation = updates.every(update => allowedUpdates.includes(update))
            if (!isValidOperation) {
                throw new HttpException(ErrorDescription.ERR_ACCESS_NOT_ALLOWED, HttpStatus.FORBIDDEN)
            }
        }

        const [rowsAffected, user] = await this.userModel.update(userData, {where: {id}})
        if (rowsAffected <= 0) {
            throw new HttpException(ErrorDescription.ERR_DB_UPDATE_ERR, HttpStatus.FORBIDDEN)
        }

        return {message: 'Пользователь обновлен!'}
    }

    async updateInternal (id: number, data: any) {
        return this.userModel.update(data, {where: {id}})
    }

    async delete (payLoad: any, id: number) {
        const hasAccess = await this.accessService.validate(payLoad, id)
        if (!hasAccess || payLoad.id === id) {
            throw new HttpException(ErrorDescription.ERR_ACCESS_NOT_ALLOWED, HttpStatus.FORBIDDEN)
        }

        const rowsAffected = await this.userModel.destroy({where: {id}})
        if (rowsAffected <= 0) {
            throw new HttpException(ErrorDescription.ERR_DB_DELETE_ERR, HttpStatus.FORBIDDEN)
        }

        return {message: 'Пользователь удален!'}
    }
}