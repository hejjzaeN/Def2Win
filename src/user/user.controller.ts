import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    create (@Body() user: UserModel) {
        return this.userService.create(user)
    }

    @HttpCode(HttpStatus.FOUND)
    @Get()
    readAll () {
        return this.userService.readAll()
    }

    @HttpCode(HttpStatus.FOUND)
    @Get(':id')
    read (@Param('id') id: number) {
        return this.userService.read(id)
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/update/:id')
    update (@Body() user: UserModel, @Param('id') id: number) {
        return this.userService.update(id, user)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/delete/:id')
    delete (@Param('id') id: number) {
        return this.userService.delete(id)
    }
}
