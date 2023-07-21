import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './buttons.module.css';

async function fetchUser(email: string) {
  try {
    const response = await fetch(`/api/user?email=${email}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export function SignInButton() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [isGuessedCorrectly, setIsGuessedCorrectly] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      const email = session.user?.email ?? '';
      fetchUser(email).then((user) => setUser(user));
    }
  }, [session, status, user]);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    const name = session.user?.name ?? '';
    return (
      <>
        <p>Logged in as <b>{name}</b></p>
        {user ? (
          <>
            <span className={styles.sp}>Level: <b>{user.level}</b></span>
            <span className={styles.sp}>XP: <b>{user.xp}</b></span>
            <span className={styles.sp}>Coins: <b>{user.coins}</b></span>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
        <br />
        {isGuessedCorrectly && session?.user?.email}
        <SignOutButton />
      </>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
