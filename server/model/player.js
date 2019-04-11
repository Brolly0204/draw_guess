const mongoose = require('./index')

const playerSchema = new mongoose.Schema({
  nikeName: {
    type: String,
    required: true
  },
  avatar: String,
  room: String,
  userId: String,
  score: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Player', playerSchema)