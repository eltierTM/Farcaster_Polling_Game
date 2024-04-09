import dbConnect from '../../lib/mongodb';
import Vote from '../../models/Vote';

export default async function handler(req, res) {
  await dbConnect();

  const { tokenId } = req.body;

  try {
    const vote = await Vote.findOneAndUpdate(
      { tokenId },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error voting for NFT', error: error.message });
  }
}
