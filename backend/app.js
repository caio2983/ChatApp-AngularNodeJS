const express = require('express');
const {createServer} = require('node:http');
const { Server } = require('socket.io');const cors = require('cors'); 


const app = express();
const server = createServer(app); // Cria um server HTTP
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });

app.get('/',(req,res) => {
    res.send('<h1>Hello World</h1>')
});

server.listen(3000, () => {
    console.log('server running at localhost 3000')
});

