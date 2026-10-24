import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {User} from '../users/users.entity'
import { Message } from './message.entity';

@Entity()
export class Conversations{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.conversations)
    user: User;

    @OneToMany(type => Message, message => message.conversation)
    messages: Message[];
}