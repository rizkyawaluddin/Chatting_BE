require('dotenv').config()
const express = require('express')

const cors = require('cors')

const http = require('http')
const {Server} = require('socket.io')

const router = require('./src/routes')

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*' 
  }
})

require('./src/socket')(io);

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/v1/', router)
app.get('/', function (req, res) {
  res.send({
      message: 'Hello World'
  });
});

app.use('/uploads', express.static('uploads'))

server.listen(port, () => console.log(`Listening on port ${port}!`))