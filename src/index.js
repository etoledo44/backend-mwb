const express = require('express')
const server = express()
const cors = require('cors')

const routes = require('./routes')

server.use(cors())
server.use(express.json())
server.use(routes)


server.listen(3333, () => console.log('running at 3333'))