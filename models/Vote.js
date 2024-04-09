import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: [true, 'Token ID is required'],
  },
  count: {
    type: Number,
    default: 1,
  },
});

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema);
