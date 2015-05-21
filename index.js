
// function createMiniHarp(){
//     var connect = require('connect');
//     var app = connect();
//     return app;
// }

module.exports = createMiniHarp;

var connect =  require('connect');
var makeJade =  require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

function createMiniHarp(root) {
    var app = connect();

    app.use(makeJade(root));
    app.use(makeLess(root));

    return app;
}
