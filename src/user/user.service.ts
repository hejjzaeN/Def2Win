import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor (@InjectModel(UserModel) private userModel: typeof UserModel) { }
}
