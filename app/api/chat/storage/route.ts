import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

const STORAGE_DIR = path.join(process.cwd(), 'data');
const CHAT_FILE = path.join(STORAGE_DIR, 'chat-history.json');

// Garantir que o diretório existe
function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

// Salvar histórico do chat
function saveChatHistory(history: ChatHistory): void {
  try {
    ensureStorageDir();
    fs.writeFileSync(CHAT_FILE, JSON.stringify(history, null, 2));
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
  }
}

// Carregar histórico do chat
function loadChatHistory(): ChatHistory {
  try {
    ensureStorageDir();
    if (fs.existsSync(CHAT_FILE)) {
      const data = fs.readFileSync(CHAT_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
  }
  
  return {
    messages: [],
    sessionId: `session-${Date.now()}`
  };
}

// GET - Carregar histórico
export async function GET() {
  try {
    const history = loadChatHistory();
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao carregar histórico' }, { status: 500 });
  }
}

// POST - Adicionar mensagem
export async function POST(request: NextRequest) {
  try {
    const { content, isUser } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Conteúdo é obrigatório' }, { status: 400 });
    }

    const message: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      isUser,
      timestamp: new Date().toISOString()
    };

    const history = loadChatHistory();
    history.messages.push(message);
    saveChatHistory(history);

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar mensagem' }, { status: 500 });
  }
}
