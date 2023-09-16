const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { addUser, getUsersInRoom, getUser } = require('./utils/users');
const { generateMessage } = require('./utils/messages');

const app = express();  // create an express app

const server = http.createServer(app); // create server with express app
const io = new Server(server);

const publicDirectoryPath = '../public';
app.use(express.static(path.join(__dirname, publicDirectoryPath)));

io.on('connection', (socket => {
    console.log(`socket id: `, socket.id);

    socket.on('join', (options, callback) => {
        console.log('options, callback',options, callback);
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        // Adds the socket to the given room or to the list of rooms.
        // https://socket.io/docs/v4/server-api/#socketjoinroom
        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', `Welcome to ${user.room} !`))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} entered the room.`))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback();
    })

    socket.on('discounnect', () => {

    });
}))

const port = 4000;
server.listen(port, () => { // run express & socket.io
    console.log(`Server is up on port ${port}`);
});