var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(5001);
