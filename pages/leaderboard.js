import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // Assume you have an endpoint to fetch NFTs sorted by voteCount
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then(setNfts);
  }, []);

  return (
    <ul>
      {nfts.map((nft) => (
        <li key={nft._id}>{nft.name} - Votes: {nft.voteCount}</li>
      ))}
    </ul>
  );
}
