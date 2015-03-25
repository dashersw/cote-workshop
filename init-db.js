var models = require('./models');

models.init(function(err) {
    if (err) return console.log(err);
});

console.log('Initializing db.');
