// Add the "use client" directive at the top of the file
"use client";

import React, { useEffect, useState } from 'react';
import Leaderboard from './Leaderboard'; // Assuming both files are in the same directory


export default function NFTVote() {
  const [nfts, setNfts] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Fetches two random NFTs
  const fetchNFTs = () => {
    fetch('/api/randomPair')
      .then(res => res.json())
      .then(data => setNfts(data))
      .catch(err => console.error("Failed to fetch NFTs:", err));
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const voteForNft = (tokenId) => {
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId }),
    })
    .then(() => fetchNFTs()) // Fetch a new pair after voting
    .catch(err => console.error("Failed to vote:", err));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        {nfts.map((nft, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img src={nft.imageSmall} alt={nft.name} style={{ maxWidth: '200px' }} />
            <p>{nft.name}</p>
            <button onClick={() => voteForNft(nft.tokenId)}>Vote</button>
          </div>
        ))}
      </div>
      <button onClick={() => setShowLeaderboard(!showLeaderboard)} style={{ display: 'block', margin: '0 auto' }}>
        {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>
      {showLeaderboard && <Leaderboard />}
    </div>
  );
}
