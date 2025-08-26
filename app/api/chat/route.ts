import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API Key do Gemini não configurada' }, { status: 500 });
    }

    // Construir contexto com histórico se disponível
    let prompt = message;
    if (history.length > 0) {
      const contextMessages = history
        .slice(-10) // Últimas 10 mensagens para contexto
        .map((msg: { isUser: boolean; content: string }) => `${msg.isUser ? 'Usuário' : 'IA'}: ${msg.content}`)
        .join('\n');
      prompt = `Contexto da conversa:\n${contextMessages}\n\nUsuário: ${message}\n\nIA:`;
    }

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-001',
      contents: prompt,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    return NextResponse.json({ 
      response: response.text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro na API do chat:', error);
    return NextResponse.json({ 
      error: 'Erro ao processar mensagem' 
    }, { status: 500 });
  }
}
