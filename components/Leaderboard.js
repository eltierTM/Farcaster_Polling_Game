import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data); // Assuming 'data' is an array of objects like you've shared
      })
      .catch(err => console.error("Failed to fetch leaderboard:", err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((item, index) => (
            <li key={index}>{`Token ID ${item.tokenId}: ${item.count} vote(s)`}</li>
          ))}
        </ul>
      ) : (
        <p>No votes yet!</p>
      )}
    </div>
  );
}

export default Leaderboard;
