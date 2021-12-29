import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Patch, Request, UseGuards } from '@nestjs/common';

import { UserModel } from './user.model';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UserController {

    constructor (private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.FOUND)
    @Get()
    readAll () {
        return this.userService.readAll()
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.FOUND)
    @Get(':id')
    read (@Param('id') id: string) {
        return this.userService.read(+id)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Patch('/update/:id')
    update (@Request() req: any, @Body() userData: UserModel, @Param('id') id: string) {
        return this.userService.update(req.user, +id, userData)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    delete (@Request() req: any, @Param('id') id: string) {
        return this.userService.delete(req.user, +id)
    }
}
