'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="font-sans p-5">
      <h1 className="text-2xl font-bold mb-4">AppFin - Chat com IA</h1>
      {session ? (
        <div className="space-y-4">
          <p className="mb-2">Conectado como {session.user?.email}</p>
          <div className="flex space-x-4">
            <Link 
              href="/chat"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Iniciar Chat
            </Link>
            <button 
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-2">Faça login para acessar o chat com IA</p>
          <button 
            onClick={() => signIn('google')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Entrar com Google
          </button>
        </div>
      )}
    </main>
  );
}
