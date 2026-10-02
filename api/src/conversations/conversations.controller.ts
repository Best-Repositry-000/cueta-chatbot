import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ConversationService } from './conversations.service';
import type { Conversation, Message } from './conversation.interface'

@Controller('v1/conversations')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {};

    @Post()
    createConversation(@Body() conversation: Conversation){
        return this.conversationService.createConversation(conversation);
    }

    @Get()
    getConversations(): Conversation[]{
        return this.conversationService.getConversations();
    }

    @Get(':userId')
    getConversationsByUserId(@Param('userId') userId: number): Conversation[] | undefined {
        return this.conversationService.getConversationByUserId(userId);
    }

    @Patch(':Id')
    patchConversation(@Param('Id') conversationId: number, @Body() updatedConversation: Partial<Conversation>): Conversation | undefined {
        return this.conversationService.patchConversation(conversationId, updatedConversation);
    }

    @Delete(':Id')
    deleteConversation(@Param('Id') conversationId: number): boolean {
        return this.conversationService.deleteConversation(conversationId);
    }

    @Post(':conversationId/messages')
    addMessage(@Param('conversationId') conversationId: number, @Body() message: Message): Message | undefined {
        return this.conversationService.addMessage(conversationId, message);
    }

    @Get(':conversationId/messages')
    getMessagesByConversationId(@Param('conversationId') conversationId: number): Message[] | undefined {
        return this.conversationService.getMessagesByConversationId(conversationId);
    }
}