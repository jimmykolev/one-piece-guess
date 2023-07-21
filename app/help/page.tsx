import Header from "@/components/header";
import styles from "./page.module.css";
import Link from "next/link";

const Help = () => {
    return (
        <div>
            <Header/>
            <h1>Game Information</h1>
            <h3>Gameplay Overview</h3>
            <div className={styles.p}>
            <p>PiecePedia is an exciting guessing game that puts your deduction skills to the test! Your objective is to guess a randomly selected character based on their attributes. Each character has specific traits, and you have 7 chances to make the correct guess.</p>
        </div>
        <h3>How to play</h3>
        <div className={styles.p}>
            <ul className={styles.l}>
                <li>Each game starts with a randomly selected character.</li>
                <li>Each character has a set of attributes that you can use to narrow down your guesses.</li>
                <li>Start guessing by selecting a character from the dropdown menu.</li>
                <li>A correct attribute will be marked in green, and others will have an up arrow or down arrow to signify whether the attribute is higher or lower than the guessed character.</li>
                <li>Each game has 7 guesses, so use them wisely!</li>
                <li>Once you have made your guess, you can click the "Guess" button to see if you are correct.</li>
                <li>If you are signed in you can gain XP to level up and rise on the leaderboard!</li>
            </ul>
            </div>
            <footer className={styles.foot}>
        <p>Created by <Link href="https://www.kolev.co.uk" target="_blank" className={styles.link}>Jimmy Kolev</Link></p>
      </footer>
        </div>
    );
}

export default Help;
