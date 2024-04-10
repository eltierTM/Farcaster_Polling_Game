import dbConnect from '../../lib/mongodb';
import Vote from '../../models/Vote';

export default async function handler(req, res) {
  await dbConnect();

  // Create indexes
  try {
    await Vote.createIndexes({ count: -1 });
    console.log('Indexes created successfully');
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ error: 'Database initialization failed', details: error.message });
  }
}
