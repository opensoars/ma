// Pretty logging (dependencies)
var cls = require('opensoars_cls'),
    Ezlog = require('Ezlog');
    log = new Ezlog(['[ma]', 'green']),
    logWarn = new Ezlog(['[ma]', 'green'], ['yellow']),
    logErr = new Ezlog(['[ma]', 'green'], ['red']);

// Make styling functions global
process.cls = cls;
process.log = log;
process.logWarn = logWarn;
process.logErr = logErr;


module.exports = require('./lib/ma.js');
