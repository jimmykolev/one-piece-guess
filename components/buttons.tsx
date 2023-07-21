import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './buttons.module.css';

interface User {
  name: string;
  level: number;
  xp: number;
  coins: number;
}

async function fetchUser(email: string) {
  try {
    const response = await fetch(`/api/user?email=${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export function SignInButton() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      setIsLoading(true);
      fetchUser(session.user.email)
        .then((userData) => {
          setIsLoading(false);
          setUser(userData);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error fetching user data:', error);
        });
    }
  }, [session, status]);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    const name = session?.user?.name ?? '';
    return (
      <>
        <p>Logged in as <b>{name}</b></p>
        {isLoading ? (
          <p>Loading user data...</p>
        ) : (
          <>
            {user ? (
              <>
                <span className={styles.sp}>Level: <b>{user.level}</b></span>
                <span className={styles.sp}>XP: <b>{user.xp}</b></span>
                <span className={styles.sp}>Coins: <b>{user.coins}</b></span>
              </>
            ) : (
              <p>No user data found.</p>
            )}
          </>
        )}
        <br />
        <SignOutButton />
      </>
    );
  }

  return (
    <button onClick={() => signIn()}>
      Sign in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button onClick={() => {
      signOut();
    }}
    >
      Sign out
    </button>
  );
}
