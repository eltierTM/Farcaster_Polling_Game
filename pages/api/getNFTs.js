// Next.js API route to fetch NFT data from the Reservoir API
export default async function handler(req, res) {
    const url = "https://api-base.reservoir.tools/tokens/v7?collection=0x424d781e0163b5a42ca2f27d036c2d5c561022c3";
  
    const headers = {
      "Accept": "*/*",
      "X-API-Key": "9aae0abd-1c77-5f53-88e5-f5374cb67a16"
    };
  
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch NFT data', error: error.message });
    }
  }
  