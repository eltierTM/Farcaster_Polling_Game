import dbConnect from '../../lib/mongodb';
import Vote from '../../models/Vote';

export default async function handler(req, res) {
  // Ensure dbConnect is called to reuse the connection effectively
  await dbConnect();

  // Destructure and validate tokenId from the request body
  const { tokenId } = req.body;
  if (!tokenId) {
    return res.status(400).json({ message: 'Token ID is required' });
  }

  try {
    // Update the vote count for the given tokenId, creating the document if it doesn't exist
    const vote = await Vote.findOneAndUpdate(
      { tokenId },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json(vote);
  } catch (error) {
    console.error("Voting error for tokenId:", tokenId, error);
    res.status(500).json({ message: 'Error voting for NFT', error: error.message });
  }
}
