var app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/product', function(req, res) {
    productRequester.send({type: 'list'}, function(err, products) {
        res.send(products);
    });
});

app.post('/product', function(req, res) {
    productRequester.send({type: 'create', product: req.body.product}, function(err, product) {
        res.send(product);
    });
});

app.delete('/product/:id', function(req, res) {
    productRequester.send({type: 'delete', id: req.params.id}, function(err, product) {
        res.send(product);
    });
});

app.get('/user', function(req, res) {
    userRequester.send({type: 'list'}, function(err, users) {
        res.send(users);
    });
});

app.get('/purchase', function(req, res) {
    purchaseRequester.send({type: 'list'}, function(err, purchases) {
        res.send(purchases);
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

var purchaseRequester = new cote.Requester({
    name: 'admin purchase requester',
    namespace: 'purchase'
});

server.listen(5000);

new cote.Sockend(io, {
    name: 'admin sockend server'
});
