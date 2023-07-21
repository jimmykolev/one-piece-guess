'use client';

import { useState, useEffect } from 'react';
import CharCard, { Character } from '@/components/CharCard';
import styles from './page.module.css';
import Link from 'next/link';
import { SignInButton } from '@/components/buttons';
import { useSession } from 'next-auth/react';
import Header from '@/components/header';



export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingCharacter, setMatchingCharacter] = useState<Character | null>(null);
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [guessedCharacters, setGuessedCharacters] = useState<Character[]>([]);
  const [guessCount, setGuessCount] = useState(0);
  const [isGuessedCorrectly, setIsGuessedCorrectly] = useState(false);
  const [userXP, setUserXP] = useState<number | null>(null);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const { data: session, status } = useSession();

  async function updateUserXP(email: string, xp: number) {
    try {
      const response = await fetch('/api/user/addxp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, xp }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating user XP:', error);
      return null;
    }
  }

  async function updateUserLevel(email: string, level: number) {
    try {
      const response = await fetch('/api/user/addlevel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, level }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating user Level:', error);
      return null;
    }
  }

  async function fetchUser(email: string) {
    try {
      const response = await fetch(`/api/user?email=${email}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session && status === 'authenticated') {
          const email = session.user?.email ?? '';
          const userData = await fetchUser(email);
          if (userData) {
            setUserXP(userData.xp);
            setUserLevel(userData.level);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [session, status]);

  const isButtonDisabled = searchQuery === '';

  const getRandomCharacter = (characters: Character[]) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  const handleGuess = () => {
    if (guessCount === 7) {
      alert("You have reached the maximum number of guesses! The correct answer was " + randomCharacter?.name + ".");
      return;
    }
    const foundCharacter = allCharacters.find(
      (character: Character) =>
        character.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setMatchingCharacter(foundCharacter || null);
    if (foundCharacter) {
      setGuessedCharacters((prevGuessedCharacters) => [
        ...prevGuessedCharacters,
        foundCharacter,
      ]);

      setGuessCount((prevGuessCount) => prevGuessCount + 1);

      if (foundCharacter.name === randomCharacter?.name) {
        if(!session) {
        alert(`Congratulations! You guessed correctly! You did it in ${guessCount + 1}/7 guesses!`);
        setIsGuessedCorrectly(true);
        }
        if (session) {
          alert(`Congratulations! You guessed correctly! You did it in ${guessCount + 1}/7 guesses! You have earned 100 XP!`);
          setIsGuessedCorrectly(true);
          updateUserXP(session.user?.email ?? '', 100);
          if(userXP == 900) {
            updateUserLevel(session.user?.email ?? '', 1);
            updateUserXP(session.user?.email ?? '', -1000);

          }
        }

      }
    }
    
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/api/characters');
        const characters = await response.json();
        setAllCharacters(characters);

        const randomCharacter = getRandomCharacter(characters);
        setRandomCharacter(randomCharacter);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []); 
  
  const sortedCharacters = allCharacters
    .filter((character) => character.name !== undefined)
    .sort((a, b) => a.name!.localeCompare(b.name!));



  return (
    <div className={styles.container}>
    <main className={styles.all}>

      <div>
        <Header/>
        <h1 className={styles.h1}>PiecePedia</h1>
      </div>
      <div>
        <p className={styles.p}>Guess that One Piece icon!</p>
        <SignInButton />
        <p className={styles.p}>Guesses: {guessCount}/7</p>


        <select value={searchQuery} onChange={handleDropdownChange}>
          <option value="">Select a character</option>
          {sortedCharacters.map((character) => (
            <option key={character.name} value={character.name}>
              {character.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleGuess} disabled={isGuessedCorrectly || isButtonDisabled}>
        Guess
      </button>
      
      </div>
      {matchingCharacter && (
        <div>
          <h2>Guessed Character:</h2>
          <CharCard
            name={matchingCharacter.name}
            age={matchingCharacter.age}
            origin={matchingCharacter.origin}
            bounty={matchingCharacter.bounty}
            height={matchingCharacter.height}
            randomCharacter={randomCharacter} 
          />
        </div>
      )}
     
      {guessedCharacters.length > 0 && (
        <div>
          <h2>Previous Guessed Characters:</h2>
          {guessedCharacters.map((character) => (
            <CharCard
              key={character.name}
              name={character.name}
              age={character.age}
              origin={character.origin}
              bounty={character.bounty}
              height={character.height}
              randomCharacter={randomCharacter} 
            />
          ))}
        </div>
      )}
      </main>
      <footer className={styles.foot}>
        <p>Created by <Link href="https://www.kolev.co.uk" target="_blank" className={styles.link}>Jimmy Kolev</Link></p>
      </footer>
    </div>
  );
}
