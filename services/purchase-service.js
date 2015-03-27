var cote = require('cote'),
    models = require('../models');

var purchaseResponder = new cote.Responder({
    name: 'purchase responder',
    namespace: 'purchase',
    respondsTo: ['buy']
});

var purchasePublisher = new cote.Publisher({
    name: 'purchase publisher',
    namespace: 'purchase',
    broadcasts: ['update']
});

purchaseResponder.on('buy', function(req, cb) {
    var purchase = new models.Purchase({});

    models.Product.get(req.productId, function(err, product) {
        if (product.stock == 0) return cb(true);

        models.User.get(req.userId, function(err, user) {
            if (user.balance < product.price) return cb(true);

            user.balance -= product.price;
            product.stock--;

            user.save(function() {
                product.save(function() {
                    purchase.setOwner(user, function() {
                        purchase.setProduct(product, function() {
                            purchase.save(function(err, purchase) {
                                cb(err, {
                                    user: user,
                                    purchase: purchase
                                });
                                updatePurchases();
                            });
                        });
                    });
                });
            });
        });
    });
});

purchaseResponder.on('list', function(req, cb) {
    var query = req.query || {};
    models.Purchase.find(query, cb);
});

function updatePurchases() {
    models.Purchase.find(function(err, purchases) {
        purchasePublisher.publish('update', purchases);
    });
}
