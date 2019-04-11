const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { secret } = require('./config.js')

function createHmac(context) {
  return crypto
    .createHmac('sha256', secret)
    .update(context)
    .digest('hex')
}

function jwtSign(data, expiresIn = '72h') {
  console.log(data)
  return jwt.sign(data, secret, {expiresIn})
}

function jwtVerify(token) {
  try {
    return jwt.verify(token, secret)
  } catch(e) {
    return e.message
  }
}

module.exports = {
  createHmac,
  jwtSign,
  jwtVerify
}
