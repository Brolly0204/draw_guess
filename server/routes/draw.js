const express = require('express')

const router = express.Router()

router.post('/syncData', (req, res) => {
  console.log(req.body)
  res.send('hello syncdata')
})

module.exports = router
