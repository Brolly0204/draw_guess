const jwt = require('jsonwebtoken')

const secret = 'wenli'

// 生成token
var token = jwt.sign({ id: 24 }, secret, { expiresIn: '72h' })
console.log(token)

// 解析token
var decoded = jwt.verify(token, secret)
console.log(decoded)
