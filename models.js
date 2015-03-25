var orm = require('orm');
var db = orm.connect('sqlite://db.sqlite');

function init(callback) {
    db.sync(callback);
}

module.exports = {
    init: init
};
