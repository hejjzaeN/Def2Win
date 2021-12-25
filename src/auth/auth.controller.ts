import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModel } from 'src/user/user.model';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    register (@Body() user: UserModel) {
        return this.authService.register(user)
    }
}
