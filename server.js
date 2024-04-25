const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
let server, io;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server = http.Server(app);
server.listen(5000, () => {
    console.log('Server started on PORT: 5000');
});

io = socketIO(server);

io.on('connection', function (socket) {
    var controllers = ['comment', 'post'];
    for (var i = 0; i < controllers.length; i++) {
        require('./controller/' + controllers[i] +'.controller')(socket);
    }
});
