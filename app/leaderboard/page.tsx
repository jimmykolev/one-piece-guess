'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "@/components/header";

async function fetchLeaderboard() {
  try {
    const response = await fetch("/api/users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboard().then((data) => setLeaderboardData(data));
  }, []);

  return (
    <div>
      <Header/>  
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
              <td>{user.name}</td>
              <td>{user.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
