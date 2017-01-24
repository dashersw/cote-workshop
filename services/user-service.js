var cote = require('cote'),
    models = require('../models');

var userResponder = new cote.Responder({
    name: 'user responder',
    namespace: 'user',
    respondsTo: ['create']
});

var userPublisher = new cote.Publisher({
    name: 'user publisher',
    namespace: 'user',
    broadcasts: ['update']
});

userResponder.on('*', console.log);

userResponder.on('create', function(req, cb) {
    models.User.create({}, cb);

    updateUsers();
});

userResponder.on('list', function(req, cb) {
    var query = req.query || {};
    models.User.find(query, cb);
});

userResponder.on('get', function(req, cb) {
    models.User.get(req.id, cb);
});

function updateUsers() {
    models.User.find(function(err, users) {
        userPublisher.publish('update', users);
    });
}
