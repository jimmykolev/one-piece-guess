import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
    return (
        <div className={styles.social}>
                <Link href="/" className={styles.socialm}>Home</Link>
                <Link href="/leaderboard" className={styles.socialm}>Leaderboard</Link>
                <Link href="/help" className={styles.socialm}>Help</Link>
        </div>
    );
}
