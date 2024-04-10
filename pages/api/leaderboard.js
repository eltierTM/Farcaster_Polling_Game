import dbConnect from '../../lib/mongodb';
import Vote from '../../models/Vote';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // Fetch only the top 20 votes, sorted by count in descending order
    const votes = await Vote.find({}).sort({ count: -1 }).limit(20);
    res.status(200).json(votes);
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
}