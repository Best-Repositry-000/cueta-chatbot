import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Conversations} from './conversations.entity';
import {Message} from './message.entity';
import {ConversationService} from './conversations.service';
import {ConversationController} from './conversations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conversations, Message])],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}