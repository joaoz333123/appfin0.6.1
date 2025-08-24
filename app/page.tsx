'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Hello World</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      )}
    </main>
  );
}
