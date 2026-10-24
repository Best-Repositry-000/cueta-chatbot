import { Message, Conversation } from './conversation.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationService {
    private messagesRepo: Message[] = [];
    private conversationsRepo: Conversation[] = [];

    createConversation(conversation: Conversation): string {
        this.conversationsRepo.push(conversation);
        return 'Conversation created successfully';
    }

    getConversations() : Conversation[]{
        return this.conversationsRepo;
    }

    getConversationByUserId(userId: number): Conversation[] | undefined {
        return this.conversationsRepo.filter(conversation => conversation.userId === userId);
    }

    patchConversation(conversationId: number, updatedConversation: Partial<Conversation>): Conversation | undefined {
        const index = this.conversationsRepo.findIndex(conversation => conversation.id === conversationId);
        if (index === -1) {
            return undefined;
        }
        this.conversationsRepo[index] = { ...this.conversationsRepo[index], ...updatedConversation };
        return this.conversationsRepo[index];
    }

    deleteConversation(conversationId: number): boolean {
        const index = this.conversationsRepo.findIndex(conversation => conversation.id === conversationId);
        if (index === -1){
            return false;
        }
        this.conversationsRepo.splice(index, 1);
        return true;
    }

    addMessage(conversationId: number, message: Message): Message | undefined {
        const conversation = this.conversationsRepo.find(conversation => conversation.id === conversationId);
        if (!conversation) {
            return undefined;
        }
        conversation.messages.push(message);
        this.messagesRepo.push(message);
        return message;
    }

    getMessagesByConversationId(conversationId: number): Message[] | undefined {
        const conversation = this.conversationsRepo.find(conversation => conversation.id === conversationId);
        if (!conversation) {
            return undefined; 
        }
        return conversation.messages;
    }
}