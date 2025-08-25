'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ChatInterface from '../components/ChatInterface';
import { ChatMessage } from '../types/chat';

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar autenticação
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/');
      return;
    }

    // Carregar histórico do chat
    loadChatHistory();
  }, [session, status, router]);

  const loadChatHistory = async () => {
    try {
      const response = await fetch('/api/chat/storage');
      if (response.ok) {
        const history = await response.json();
        setMessages(history.messages);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const addMessageToStorage = async (content: string, isUser: boolean): Promise<ChatMessage> => {
    const response = await fetch('/api/chat/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, isUser }),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar mensagem');
    }

    return await response.json();
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);

    try {
      // Adicionar mensagem do usuário
      const userMessage = await addMessageToStorage(content, true);
      setMessages(prev => [...prev, userMessage]);

      // Enviar para API do Gemini com histórico
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: content,
          history: messages.slice(-10) // Enviar últimas 10 mensagens como contexto
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na comunicação com a IA');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Adicionar resposta da IA
      const aiMessage = await addMessageToStorage(data.response, false);
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Adicionar mensagem de erro
      const errorMessage = await addMessageToStorage(
        'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        false
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirecionar se não autenticado
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Chat com IA</h1>
              <p className="text-sm text-gray-500">
                Conectado como {session.user?.email}
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="h-[calc(100vh-80px)]">
        <ChatInterface
          onSendMessage={handleSendMessage}
          messages={messages}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
