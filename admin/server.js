var app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(5000);
