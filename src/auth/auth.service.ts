import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { AccessLevel } from 'src/const/db';
import { UserProfileDto } from 'src/dto/user-profile.dto';
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
            return null
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            const {email, password, tokens, ...result} = user
            return result
        }
        
        return null
    }

    async register (user: UserModel) {
        try {
            if (!user.email || !user.password || !user.firstname || !user.surname || !user.dob) {
                throw new Error('Empty values are not allowed')
            }

            const checkUser = await this.userService.readByEmail(user.email)
            if (checkUser) {
                throw new Error('This user already exists')
            }

            user.joinedOn = new Date();
            user.accessLevel = AccessLevel.MEMBER
            user.password = await bcrypt.hash(user.password, +process.env.BCRYPT_SALT_ROUND)
            // TO DO
            user.tokens = '1'

            const newUser = await this.userModel.create(user)
            if (!newUser) {
                throw new Error('Cannot create user')
            }

            return {message: `${newUser.firstname} ${newUser.surname} has been created`}
        }
        catch (err) {
            return new HttpException(err, HttpStatus.FORBIDDEN)
        }
    }

    async login (user: UserProfileDto) {
        const payLoad = {user: user.firstname, sub: user.id}
        return {
            ...user,
            tokens: this.jwtService.sign(payLoad)
        }
    }
}
