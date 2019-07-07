const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const users = new Map();

io.on('connection', socket => {
    console.log('connected');

    socket.on('connected', data => {
        io.emit('connected', {
            newUser: data,
            currentUsers: Array.from(users.values())
        });

        users.set(socket.id, {
            id: data.id,
            position: data.position
        });
    });

    socket.on('updatePosition', data => {
        users.set(socket.id, {
            id: data.id,
            position: data.position
        });
        io.emit('updatePosition', data);
    });

    socket.on("disconnect",  () => {
        if (users.has(socket.id)) {
            io.emit('disconnected', users.get(socket.id).id);
            users.delete(socket.id);
        }
    });
});

http.listen(3001, () => {
    console.log('listening on :3001');
});