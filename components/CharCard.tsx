// CharCard.tsx
import React from 'react';
import style from './CharCard.module.css';
import beli from '../public/Beli.webp';
import Image from 'next/image';

export interface Character {
  name: string;
  age: number;
  origin: string;
  bounty: number;
  height: number;
}

function numberWithCommas(x: { toString: () => string }) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const imageStyle = {
    webkitFilter: 'invert(100%)',
    filter: 'invert(100%)',
  };
  
  interface CharCardProps extends Character {
    styles?: {
      name?: React.CSSProperties;
      age?: React.CSSProperties;
      origin?: React.CSSProperties;
      bounty?: React.CSSProperties;
      height?: React.CSSProperties;
    };
    randomCharacter?: Character | null; // Make randomCharacter prop optional
  }
  
  export default function CharCard({
    name,
    age,
    origin,
    bounty,
    height,
    styles = {},
    randomCharacter,
  }: CharCardProps) {
    const isMatchingProperty = (guessedValue: string | number, randomValue: string | number) => {
      return guessedValue === randomValue;
    };
  
    const renderArrow = (property: string, guessedValue: string | number, randomValue?: string | number) => {
        if (!randomCharacter || randomValue === undefined || guessedValue === randomValue) {
          return null;
        }
      
        const arrowStyle = {
          color: guessedValue > (randomValue ?? 0) ? 'red' : 'green', // Provide a default value of 0 if randomValue is undefined
        };
      
        return (
          <span style={arrowStyle}>
            {guessedValue > (randomValue ?? 0) ? <>&#9660;</> : <>&#9650;</>}
          </span>
        );
      };
    
  
    return (
      <div className={style.card}>
        <div>
          <h2 style={styles.name}>{name}</h2>
          <span
            className={style.sp}
            style={{
              ...styles.age,
              color: randomCharacter && isMatchingProperty(age, randomCharacter.age) ? '#21c55d' : 'inherit',
            }}
          >
            Age: {age}
            {renderArrow('age', age, randomCharacter?.age)}
          </span>
          <span
            className={style.sp}
            style={{
              ...styles.origin,
              color: randomCharacter && isMatchingProperty(origin, randomCharacter.origin)
                ? '#21c55d'
                : 'inherit',
            }}
          >
            Origin: {origin}
          </span>
          <span
            className={style.sp}
            style={{
              ...styles.bounty,
              color: randomCharacter && isMatchingProperty(bounty, randomCharacter.bounty)
                ? '#21c55d'
                : 'inherit',
            }}
          >
            Bounty:{' '}
            <Image
              src="/Beli.webp"
              width={10}
              height={15}
              alt="Beli"
              style={{
                ...(randomCharacter &&
                isMatchingProperty(bounty, randomCharacter.bounty)
                  ? {
                      filter:
                        'invert(56%) sepia(89%) saturate(421%) hue-rotate(89deg) brightness(93%) contrast(88%)',
                    }
                  : imageStyle),
              }}
            />
            {numberWithCommas(bounty)}
            {renderArrow('bounty', bounty, randomCharacter?.bounty)}
          </span>
          <span
            className={style.sp}
            style={{
              ...styles.height,
              color: randomCharacter && isMatchingProperty(height, randomCharacter.height)
                ? '#21c55d'
                : 'inherit',
            }}
          >
            Height: {height}cm
            {renderArrow('height', height, randomCharacter?.height)}
          </span>
        </div>
      </div>
    );
  }
  