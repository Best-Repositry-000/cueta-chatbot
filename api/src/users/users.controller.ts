import {UserService} from './users.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async createUser(@Body('username') username: string) {
        return await this.userService.createUser(username);
    }

    @Get(':username')
    async getUser(@Param('username') username: string) {
        return await this.userService.getUserByUsername(username);
    }
}