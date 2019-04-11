const express = require('express')
const userModel = require('../model/user')
const { createHmac, jwtSign, jwtVerify } = require('../util')

const router = express.Router()

router.post('/register', (req, res) => {
  const { nikeName, password } = req.body
  userModel.findOne({ nikeName }, function(err, doc) {
    if (doc) {
      res.send({
        code: 1,
        msg: '用户名已经存在！'
      })
    } else {
      userModel.create(
        {
          ...req.body,
          password: createHmac(password)
        },
        function(err, docs) {
          if (!err) {
            res.send({
              code: 0,
              nikeName: docs.nikeName,
              msg: '注册成功！'
            })
          }
        }
      )
    }
  })
})

router.post('/login', (req, res) => {
  const { nikeName, password } = req.body
  userModel.findOne({nikeName, password: createHmac(password)}, function (err, doc) {
    if (doc) {
      const payload = {nikeName: doc.nikeName, password: doc.password }
      const token = jwtSign(payload)

      // res.setHeader('Authorization', `Bearer ${token}`)
      res.send({
        code: 0,
        data: { nikeName: doc.nikeName, token },
        msg: '登录成功'
      })
    } else {
      res.send({
        code: 1,
        data: null,
        msg: '用户名或密码错误！'
      })
    }
  })

})

module.exports = router
