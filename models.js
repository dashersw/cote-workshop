var orm = require('orm');
var db = orm.connect('sqlite://' + __dirname + '/db.sqlite');
db.settings.set('instance.cache', false);

var Product = db.define('product', {
    name: String,
    price: Number,
    stock: Number
});

function init(callback) {
    db.sync(callback);
}

module.exports = {
    Product: Product,
    init: init
};
