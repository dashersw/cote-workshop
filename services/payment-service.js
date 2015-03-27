var cote = require('cote'),
    models = require('../models');

var paymentResponder = new cote.Responder({
    name: 'payment responder',
    namespace: 'payment'
}, { multicast: '239.1.11.111' });

paymentResponder.on('process', function(req, cb) {
    models.User.get(req.userId, function(err, user) {
        if (user.balance < req.price) return cb(true);

        user.balance -= req.price;

        user.save(cb);
    });
});
