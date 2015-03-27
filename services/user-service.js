var cote = require('cote'),
    models = require('../models');

var userResponder = new cote.Responder({
    name: 'user responder',
    namespace: 'user',
    respondsTo: ['create']
}, { multicast: '239.1.11.111' });

var userPublisher = new cote.Publisher({
    name: 'user publisher',
    namespace: 'user',
    broadcasts: ['update']
}, { multicast: '239.1.11.111' });

userResponder.on('create', function(req, cb) {
    models.User.create({}, cb);

    updateUsers();
});

userResponder.on('list', function(req, cb) {
    var query = req.query || {};
    models.User.find(query, cb);
});

function updateUsers() {
    models.User.find(function(err, users) {
        userPublisher.publish('update', users);
    });
}
