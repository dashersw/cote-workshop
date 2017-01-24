var models = require('./models');

var products = [
    {
        name: 'Fancy dish',
        price: 1,
        stock: 20
    },
    {
        name: 'Healthy food',
        price: 2,
        stock: 20
    },
    {
        name: 'Feast for kings',
        price: 3,
        stock: 20
    }
];

module.exports = new Promise((resolve, reject) => {
    models.drop(err => {
        if (err) return console.log(err);

        models.init(function(err) {
            if (err) return console.log(err);

            products.forEach(function(product) {
                models.Product.create(product, function(err, product) {
                    console.log('Initialized', product.name);

                    resolve();
                });
            });
        });
    });
});
