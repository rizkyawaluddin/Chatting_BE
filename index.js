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

require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = { pool }
// const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/', router)
app.get('/', function (req, res) {
  res.send({
      message: 'Hello World'
  });
});

app.use('/uploads', express.static('uploads'))

server.listen(port, () => console.log(`Listening on port ${port}!`))