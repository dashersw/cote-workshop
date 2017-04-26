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

// userResponder.on('*', console.log);

userResponder.on('create', () => create().then(updateUsers));

userResponder.on('list', (req) => find(req));

userResponder.on('get', function(req, cb) {
    models.User.get(req.id, cb);
});

function updateUsers(user) {
    models.User.find(function(err, users) {
        userPublisher.publish('update', users);
    });

    return user;
}

const find = ({query = {}}) => new Promise((resolve, reject) => {
    models.User.find(query, (err, res) => {
        if (err) return reject(err);
        resolve(res);
    });
});

const create = () => new Promise((resolve, reject) => {
    console.log('create istegi');
    models.User.create({}, (err, res) => {
        if (err) return reject(err);
        resolve(res);
    });
});
