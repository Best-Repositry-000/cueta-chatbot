import {Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, } from '@nestjs/common';
import { ConversationService } from './conversations.service';
import { Conversations } from './conversations.entity';
import { Message } from './message.entity';

@Controller('conversations')
export class ConversationController {
    constructor(
        private readonly conversationService: ConversationService,
    ) {}

    @Post()
    createConversation(@Body() conversation: Conversations): Promise<string> {
        return this.conversationService.createConversation(conversation);
    }

    @Get()
    getConversations(): Promise<Conversations[]> {
        return this.conversationService.getConversations();
    }

    @Get(':userId')
    getConversationsByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Conversations[]> {
        return this.conversationService.getConversationByUserId(userId);
    }

    @Patch(':id')
    patchConversation(@Param('id', ParseIntPipe) conversationId: number,
    @Body() updatedConversation: Partial<Conversations>): Promise<Conversations | null> {
        return this.conversationService.patchConversation( conversationId, updatedConversation );
    }

    @Delete(':id')
    deleteConversation(@Param('id', ParseIntPipe) conversationId: number): Promise<string> {
        return this.conversationService.deleteConversation(conversationId);
    }

    @Post(':conversationId/messages')
    addMessage(@Param('conversationId', ParseIntPipe) conversationId: number, @Body() message: Message
    ): Promise<Message | null> {
        return this.conversationService.addMessage(conversationId, message);
    }

    @Get(':conversationId/messages')
    getMessagesByConversationId(@Param('conversationId', ParseIntPipe) conversationId: number
    ): Promise<Message[]> {
        return this.conversationService.getMessagesByConversationId(conversationId);
    }
}