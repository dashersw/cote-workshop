var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.get('/', function (req, res) {
    console.log(`${req.ip} requested end-user interface`);

    res.sendFile(__dirname + '/index.html');
});

server.listen(5001);

new cote.Sockend(io, {
    name: 'end-user sockend server'
});
