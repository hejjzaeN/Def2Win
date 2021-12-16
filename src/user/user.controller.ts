import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService: UserService) {}

    @Post()
    create (@Body() user: UserModel) {
        return this.userService.create(user)
    }

    @Get()
    readAll () {
        return this.userService.readAll()
    }

    @Get(':id')
    read (@Param('id') id: number) {
        return this.userService.read(id)
    }

    @Patch(':id')
    update (@Body() user: UserModel, @Param('id') id: number) {
        return this.userService.update(id, user)
    }
}
