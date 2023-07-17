'use client';

import { useState, useEffect } from 'react';
import CharCard, { Character } from '@/components/CharCard';
import styles from './page.module.css';



export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingCharacter, setMatchingCharacter] = useState<Character | null>(null);
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [guessedCharacters, setGuessedCharacters] = useState<Character[]>([]);
  const [guessCount, setGuessCount] = useState(0);
  const [isGuessedCorrectly, setIsGuessedCorrectly] = useState(false);

  const getRandomCharacter = (characters: Character[]) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  const isButtonDisabled = searchQuery === '';

  const handleGuess = () => {
    if (guessCount === 7) {
      alert("You have reached the maximum number of guesses! Please refresh the page to play again. The correct answer was " + randomCharacter?.name + ".");
      return;
    }
    const foundCharacter = allCharacters.find(
      (character: Character) =>
        character.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setMatchingCharacter(foundCharacter || null);
    // Add the guessed character to the list of guessed characters
    if (foundCharacter) {
      setGuessedCharacters((prevGuessedCharacters) => [
        ...prevGuessedCharacters,
        foundCharacter,
      ]);

      setGuessCount((prevGuessCount) => prevGuessCount + 1);

      if (foundCharacter.name === randomCharacter?.name) {
        alert(`Congratulations! You guessed correctly! You did it in ${guessCount + 1}/7 guesses! Please refresh the page to play again.`);
        setIsGuessedCorrectly(true);
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

        // Select a random character and set it as the randomCharacter
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
    <main className={styles.all}>

      <div>
        <h1>One Piece Guess</h1>
      </div>
      <div>
        <p>Guess your favorite One Piece characters!</p>
        <p>Data updated as of Egghead Arc</p>
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
        <span>Guesses: {guessCount}/7</span>
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
      <footer className={styles.foot}>
        <p>Created by Jimmy Kolev</p>
      </footer>
    </main>
  );
}
