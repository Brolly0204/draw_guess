const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const playerModel = require('./model/player')
const { jwtVerify } = require('./util')

const userRouter = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

io.on('connection', socket => {
  socket.on('joinChat', data => {
    // 测试加入
    socket.join(data.room)
    // 加入房间处理 
    joinPlayer(socket, data)

  })

  socket.on('leaveChat', data => {
    socket.leave(data.room)
    socket.emit('leaved')
  })

  socket.on('sendmsg', data => {
    io.in(data.room).emit('recvmsg', data)
  })

  socket.on('syncDraw', data => {
    console.log('room', data.room)
    socket.broadcast.to(data.room).emit('realTimeDraw', data)
  })
})

app.get('/', (req, res) => {
  res.send('hello react!')
})

app.use('/user', userRouter)

const PORT = 7000
http.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`)
})

function joinPlayer(socket, data) {
  console.log('data', data)
  const player = jwtVerify(data.token)
  if (player.nikeName) {
    const userData = { nikeName: player.nikeName, room: data.room }
    socket.join(data.room)

    // playerModel.create(userData, function (err, doc) {
    //   if (doc) {
    //     socket.emit('joined', {
    //       // 房间内玩家列表
    //       player: io.sockets.adapter.rooms[data.room].sockets,
    //       // 房间列表
    //       rooms: io.sockets.adapter.rooms
    //     })
    //   }
    // })
  }
}
