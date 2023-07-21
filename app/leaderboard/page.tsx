'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "@/components/header";

interface User {
  id: string | null | undefined;
  name: string;
  level: number;
}

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<Array<User>>([]);

  useEffect(() => {
    fetchLeaderboard().then((data) => setLeaderboardData(data));
  }, []);

  // Extract the first name from the full name
  function getFirstName(fullName: string): string {
    return fullName.split(" ")[0];
  }

  return (
    <div>
      <Header />
      <h1>Leaderboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{getFirstName(user.name)}</td>
              <td>{user.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;

async function fetchLeaderboard() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}
