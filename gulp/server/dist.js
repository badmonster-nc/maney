require('babel-register');
var options = require('./../options');
var server = require('./server.js');
options.src = options.dist;
options.liveReload = false;
server.startExpress(options);




