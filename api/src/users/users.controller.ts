import {UserService} from './users.service';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async createUser(@Body('username') username: string) {
        return await this.userService.createUser(username);
    }

    @Post('signup')
    @HttpCode(HttpStatus.OK) 
    async getUser(@Body('username') username: string) {
        return await this.userService.getUserByUsername(username);
    }
}