const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();  // create an express app

const server = http.createServer(app); // create server with express app
const io = new Server(server);

const publicDirectoryPath = '../public';
app.use(express.static(path.join(__dirname, publicDirectoryPath)));

io.on('connection', (socket => {
    console.log(socket.id);

    socket.on('join', () => {});

    socket.on('sendMessage', () => {});

    socket.on('discounnect', () => {});
}))

const port = 4000;
server.listen(port, () => { // run express & socket.io
    console.log(`Server is up on port ${port}`);
});