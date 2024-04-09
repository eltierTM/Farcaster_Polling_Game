import dbConnect from '../../lib/mongodb';
import Vote from '../../models/Vote';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const votes = await Vote.find({}).sort({ count: -1 });

    res.status(200).json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
}
