import {User} from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    ) {}

    async createUser(username: string): Promise<string> {
        const existing = await this.usersRepository.findOne({where: {username}});
        if(existing){
            throw new Error('User already exists');
        }
        const user = this.usersRepository.create({username});
        this.usersRepository.save(user);
        return 'Welcome ' + username + '!';
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({where: {username}});
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }
}