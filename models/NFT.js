const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  voteCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.models.NFT || mongoose.model('NFT', NFTSchema);
