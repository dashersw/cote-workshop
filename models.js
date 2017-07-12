var orm = require('orm');

var connectionString;

if (process.env.PG == 'true')
    connectionString = 'postgres://cote:ohgath2ig8eoP8@postgres/cote';
else
    connectionString = 'sqlite://db.sqlite';

var db = orm.connect(connectionString, function onConnect(err) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
});

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
    console.log('Initializing db.');

    db.sync(callback);
}

function drop(callback) {
    if (process.env.DROP) {
        console.log('Dropping db.');
        db.drop(callback);
    }
    else
        callback();
}

db.sync();

module.exports = {
    Product: Product,
    Purchase: Purchase,
    User: User,
    init: init,
    drop: drop
};
