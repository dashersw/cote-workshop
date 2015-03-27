var app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/product', function(req, res) {
    productRequester.send({ type: 'list' }, function(err, products) {
        res.send(products);
    });
});

app.post('/product', function(req, res) {
    productRequester.send({ type: 'create', product: req.body.product }, function(err, product) {
        res.send(product);
    });
});

app.delete('/product/:id', function(req, res) {
    productRequester.send({ type: 'delete', id: req.params.id }, function(err, product) {
        res.send(product);
    });
});

app.get('/user', function(req, res) {
    userRequester.send({ type: 'list' }, function(err, users) {
        res.send(users);
    });
});


var productRequester = new cote.Requester({
    name: 'admin product requester',
    namespace: 'product'
});

var userRequester = new cote.Requester({
    name: 'admin user requester',
    namespace: 'user'
});

server.listen(5000);
