const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const users = new Map();

io.on('connection', socket => {
    socket.on('connected', data => {
        users.set(socket.id, {
            clientID: data.clientID,
            position: data.position
        });

        io.emit('connected', {
            newUser: data,
            currentUsers: Array.from(users.values()).filter(user => user.clientID !== data.clientID)
        });

        console.log('new client connected:');
        console.log(Array.from(users.values()).reduce((acc, c) => {
            return acc + (c.clientID === data.clientID ? `\u001b[36m${c.clientID}\u001b[0m, ` : `${c.clientID}, `)
        }, '').slice(0, -2))
    });

    socket.on('updatePosition', data => {
        users.set(socket.id, {
            clientID: data.clientID,
            position: data.position
        });
        io.emit('updatePosition', data);
    });

    socket.on("disconnect",  () => {
        if (users.has(socket.id)) {
            io.emit('disconnected', users.get(socket.id).clientID);
            users.delete(socket.id);
            console.log('client disconnected:');
            console.log(Array.from(users.values()).reduce((acc, c) => {
                return acc + c.clientID + ', '
            }, '').slice(0, -2));
        }
    });
});

http.listen(3001, () => {
    console.log('listening on :3001');
});