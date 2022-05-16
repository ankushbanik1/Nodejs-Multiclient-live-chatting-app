// const { Namespace, Socket } = require('socket.io');

// const { response } = require("express");
// const express = require("express");
// const https = require("https");
// const app = express();



const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});
const user = {};

io.on('connection', socket => {
    socket.on("new-user-joined", name => {
        console.log(`${name} joined the chat`)
        user[socket.id] = name
        socket.broadcast.emit('user-joined', name)
        //io.brodcast.emit('user-joined',name)

        user[socket.id] = name;
    })
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] })
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', user[socket.id])
        delete user[socket.id]
    })
})




// app.get('/', (req, res) => {
//     res.sendFile(__dirname+'/index.html');

// })

// app.listen(3000, function() {
//     console.log("server")
// })