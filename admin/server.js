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


var productRequester = new cote.Requester({
    name: 'admin product requester',
    namespace: 'product'
});
server.listen(5000);
