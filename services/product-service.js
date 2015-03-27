var cote = require('cote'),
    models = require('../models');

var productResponder = new cote.Responder({
    name: 'product responder',
    namespace: 'product'
});

productResponder.on('list', function(req, cb) {
    var query = req.query || {};
    models.Product.find(query, cb);
});

productResponder.on('create', function(req, cb) {
    models.Product.create(req.product, cb);
});
