import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModel } from 'src/user/user.model';
import { LocalAuthenticationGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    register (@Body() user: UserModel) {
        return this.authService.register(user)
    }

    @UseGuards(LocalAuthenticationGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login (@Request() req: any) {
        return this.authService.login(req.user)
    }
}
