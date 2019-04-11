const mongoose = require('./index.js')

const userSchema = new mongoose.Schema({
  nikeName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
