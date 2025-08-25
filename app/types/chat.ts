export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
  sessionId: string;
}
