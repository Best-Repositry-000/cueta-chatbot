import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversations } from './conversations.entity';
import { Message } from './message.entity';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversations)
        private readonly conversationsRepository: Repository<Conversations>,
        @InjectRepository(Message)
        private readonly messagesRepository: Repository<Message>,
    ) {}

    async createConversation(conversation: Conversations): Promise<string> {
        await this.conversationsRepository.save(conversation);
        return 'Conversation created successfully';
    }

    async getConversations(): Promise<Conversations[]> {
        return this.conversationsRepository.find({relations: {user: true, messages: true}});
    }

    async getConversationByUserId(userId: number): Promise<Conversations[]> {
        return this.conversationsRepository.find({where: {user: {id: userId}},
            relations: { user: true, messages: true}});
    }

    async patchConversation(conversationId: number, updatedConversation: Partial<Conversations>
    ): Promise<Conversations | null> {
        const conversation =
            await this.conversationsRepository.findOne({ where: {id: conversationId} });
        if (!conversation) { return null;}

        Object.assign(conversation, updatedConversation);
        return this.conversationsRepository.save(conversation);
    }

    async deleteConversation(conversationId: number): Promise<string> {
        const result = await this.conversationsRepository.delete(conversationId);
        return result.affected !== 0 ? 'Conversation deleted successfully' : 'Failed to delete conversation';
    }

    async addMessage(conversationId: number, message: Message): Promise<Message | null> {
        const conversation =
            await this.conversationsRepository.findOne({where: {id: conversationId}});
        if (!conversation) { return null; }

        message.conversation = conversation;
        return this.messagesRepository.save(message);
    }

    async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
        return this.messagesRepository.find({where: { conversation: { id: conversationId }},
            relations: { conversation: true } });
    }
}