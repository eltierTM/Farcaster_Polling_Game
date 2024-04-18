export default async function handler(req, res) {
  const url = "https://api-base.reservoir.tools/tokens/v7?collection=0x424d781e0163b5a42ca2f27d036c2d5c561022c3";

  const headers = {
    "Accept": "*/*",
    "X-API-Key": "YOUR_API_KEY_HERE" // Make sure to use your actual API key here
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    const tokens = data.tokens;

    // Select two random tokens
    const randomIndices = [];
    while (randomIndices.length < 2) {
      const randomIndex = Math.floor(Math.random() * tokens.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    const randomTokens = randomIndices.map(index => tokens[index].token);

    res.status(200).json(randomTokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch NFT data', error: error.message });
  }
}
