import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { AccessLevel } from 'src/const/db';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(UserModel) private userModel: typeof UserModel,
        private userService: UserService
    ) {}

    async validateUser (email: string, password: string) {
        const user = await this.userService.readByEmail(email)
        const passwordMatch = await bcrypt.compare(password, user.Password)

        if (user && passwordMatch) {
            const {Email, Password, ...result} = user
            return result
        }

        return null
    }

    async register (user: UserModel) {
        try {
            if (!user.Email || !user.Password || !user.Firstname || !user.Surname || !user.Dob) {
                throw new Error('Empty values are not allowed')
            }

            const checkUser = await this.userService.readByEmail(user.Email)
            if (checkUser) {
                throw new Error('This user already exists')
            }

            user.JoinedOn = new Date();
            user.AccessLevel = AccessLevel.MEMBER
            user.Password = await bcrypt.hash(user.Password, +process.env.BCRYPT_SALT_ROUND)
            // TO DO
            user.Tokens = '1'

            const newUser = await this.userModel.create(user)
            if (!newUser) {
                throw new Error('Cannot create user')
            }

            return {message: `${newUser.Firstname} ${newUser.Surname} has been created`}
        }
        catch (err) {
            return new HttpException(err, HttpStatus.FORBIDDEN)
        }
    }
}
