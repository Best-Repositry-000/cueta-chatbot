import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Conversations } from '../conversations/conversations.entity'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    username: string;

    @OneToMany(type => Conversations, conversations => conversations.user)
    conversations: Conversations[];
}