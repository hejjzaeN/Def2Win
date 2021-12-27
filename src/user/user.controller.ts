import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';

import { UserModel } from './user.model';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('user')
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
    read (@Param('id') id: number) {
        return this.userService.read(id)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Patch('/update/:id')
    update (@Body() user: UserModel, @Param('id') id: number) {
        return this.userService.update(id, user)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    delete (@Param('id') id: number) {
        return this.userService.delete(id)
    }
}
