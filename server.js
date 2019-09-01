const port = 3000;

const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/view')); 

server.listen(port);

let messages = []

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);
    
    socket.on('sendMessage', data => {
        messages.push(data)

        socket.broadcast.emit('receivedMessage', data);
    })
});

module.exports = { app }