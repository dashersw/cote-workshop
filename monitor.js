var cote = require('cote');

new cote.Monitor({
    name: 'monitor'
}, { multicast: '239.1.11.111' });
