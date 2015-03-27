var orm = require('orm');
var db = orm.connect('sqlite://' + __dirname + '/db.sqlite');
db.settings.set('instance.cache', false);

function init(callback) {
    db.sync(callback);
}

module.exports = {
    init: init
};
