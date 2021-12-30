import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { AccessLevel } from 'src/const/db.const';
import { ErrorDescription } from 'src/const/errors.const';
import { AUTH_MAX_LOGIN_ATTEMPTS } from 'src/const/user.const';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(UserModel) private userModel: typeof UserModel,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser (email: string, password: string) {
        const user = await this.userService.readByEmail(email)
        if (!user) {
            throw new HttpException(ErrorDescription.ERR_AUTH_INVALID_CREDENTIALS, HttpStatus.FORBIDDEN)
        }
        if (user.accessLevel === AccessLevel.PENDING) {
            throw new HttpException(ErrorDescription.ERR_AUTH_PENDING, HttpStatus.FORBIDDEN)
        }
        if (user.loginAttempts > AUTH_MAX_LOGIN_ATTEMPTS) {
            throw new HttpException(ErrorDescription.ERR_AUTH_EXCEED_LOGIN_ATTEMPTS, HttpStatus.FORBIDDEN)
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            const {email, password, ...result} = user
            return result
        } else {
            user.loginAttempts += 1
            if (user.loginAttempts === AUTH_MAX_LOGIN_ATTEMPTS) {
                user.accessLevel = AccessLevel.BANNED
            }
            await this.userService.updateInternal(user.id, user)
            throw new HttpException(ErrorDescription.ERR_AUTH_INVALID_CREDENTIALS, HttpStatus.FORBIDDEN)
        }
    
        return null
    }

    async register (user: UserModel) {
        if (!user.email || !user.password || !user.firstname || !user.surname || !user.dob) {
            throw new HttpException(ErrorDescription.ERR_AUTH_EMPTY_VALUES, HttpStatus.FORBIDDEN)
        }

        const checkUser = await this.userService.readByEmail(user.email)
        if (checkUser) {
            throw new HttpException(ErrorDescription.ERR_AUTH_ALREADY_EXIST, HttpStatus.FORBIDDEN)
        }

        user.joinedOn = new Date();
        user.accessLevel = AccessLevel.PENDING
        user.token = this.jwtService.sign({user: user.firstname, sub: user.id})
        user.password = await bcrypt.hash(user.password, +process.env.BCRYPT_SALT_ROUND)

        const newUser = await this.userModel.create(user)
        if (!newUser) {
            throw new HttpException(ErrorDescription.ERR_DB_CREATE_ERR, HttpStatus.FORBIDDEN)
        }

        return {message: `${newUser.firstname} ${newUser.surname} has been created`}
    }

    async login (user: any) {
        const payLoad = {user: user.firstname, sub: user.id}

        user.token = this.jwtService.sign(payLoad)
    
        const rowsAffected = await this.userService.updateInternal(user.id, user)
        if (!rowsAffected) {
            throw new HttpException(ErrorDescription.ERR_DB_UPDATE_ERR, HttpStatus.FORBIDDEN)
        }

        return user
    }
}
