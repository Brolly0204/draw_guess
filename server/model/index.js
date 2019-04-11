const mongoose = require('mongoose')
const { DB_URL } = require('../config.js')

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
)

module.exports = mongoose
