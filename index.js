
function createMiniHarp(){
    var connect = require('connect');
    var app = connect();
    return app;
}

module.exports = createMiniHarp;
