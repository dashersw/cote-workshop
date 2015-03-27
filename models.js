var orm = require('orm');
var db = orm.connect('sqlite://' + __dirname + '/db.sqlite');
db.settings.set('instance.cache', false);

var Product = db.define('product', {
    name: String,
    price: Number,
    stock: Number
});

var Purchase = db.define('purchase', {});

var User = db.define('user', {
    balance: { type: 'number', defaultValue: 30 }
});

Purchase.hasOne('product', Product, {
    autoFetch: true
});
Purchase.hasOne('owner', User, {
    autoFetch: true,
    reverse: 'purchases'
});

function init(callback) {
    db.drop(function() {
        db.sync(callback);
    });
}

module.exports = {
    Product: Product,
    Purchase: Purchase,
    User: User,
    init: init
};
