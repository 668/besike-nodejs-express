
function createMiniHarp(){
    var connect = require('connect');
    var app = connect();
    return app;
}

module.exports = createMiniHarp;


function currentTime(req, res, next) {
    if(req.url === "/current-time") {
        res.end((new Date()).toISOString())
    }
}

