var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(5001);

new cote.Sockend(io, {
    name: 'end-user sockend server'
});
