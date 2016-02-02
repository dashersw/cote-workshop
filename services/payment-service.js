var cote = require('cote')({multicast: '239.1.11.111'}),
    models = require('../models');

var paymentResponder = new cote.Responder({
    name: 'payment responder',
    key: 'payment'
});

paymentResponder.on('process', function(req, cb) {
    models.User.get(req.userId, function(err, user) {
        if (user.balance < req.price) return cb(true);

        user.balance -= req.price;

        user.save(cb);
    });
});
