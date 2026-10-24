export interface Message{
    id: number;
    conversationId: number;
    content: string;
}

export interface Conversation{
    id: number;
    userId: number;
    title: string;
    messages: Message[];
}
