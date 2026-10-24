import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from 'typeorm';
import {Conversations} from './conversations.entity';

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(()=>Conversations, (Conversation) => Conversation.messages)
    conversation: Conversations;
}