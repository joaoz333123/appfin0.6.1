import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API Key do Gemini não configurada' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Construir contexto com histórico se disponível
    let prompt = message;
    if (history.length > 0) {
      const contextMessages = history
        .slice(-10) // Últimas 10 mensagens para contexto
        .map((msg: { isUser: boolean; content: string }) => `${msg.isUser ? 'Usuário' : 'IA'}: ${msg.content}`)
        .join('\n');
      prompt = `Contexto da conversa:\n${contextMessages}\n\nUsuário: ${message}\n\nIA:`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro na API do chat:', error);
    return NextResponse.json({ 
      error: 'Erro ao processar mensagem' 
    }, { status: 500 });
  }
}
