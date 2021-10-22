const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 3000
const routes = require('./routes')
const session = require('express-session')
const {Server} = require('socket.io')
const io = new Server(server)

//middleware part!
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24
  },
  resave: false
}))

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    socket.broadcast.emit(`chat ${data.userType} ${data.id}`, `${data.username}: ${data.msg}`)
  })
})

app.use('/', routes)


server.listen(port, () => console.log('Running on port', 3000))