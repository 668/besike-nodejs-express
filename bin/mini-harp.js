#!/usr/bin/env node

var parseArgs = require('minimist');
var createMiniHarp = require("mini-harp");

var args = parseArgs(process.argv);
var port = args["port"] ? args["port"] : 4000;
var app = createMiniHarp();

console.log("Starting mini-harp on http://localhost:%s", port);
app
.use(function(req, res, next){
    if(req.url === "/current-time"){
        res.write((new Date()).toISOString() + "\n");
        res.end();
    } else {
        res.end("Cannot Get " + req.url + "\n");
    }

})
.listen(port);