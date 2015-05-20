#!/usr/bin/env node

var parseArgs = require('minimist');
var miniHarp = require("mini-harp");
var serveStatic = require('serve-static');

// var root = process.cwd(); // current directory
var args = parseArgs(process.argv);
var port = args["port"] || 4000;
var app = miniHarp();
var root = process.cwd();
if(args._.length > 2){
    root = args._[2];
}

console.log("Starting mini-harp on http://localhost:%s", port);
app
.use(function(req, res, next){
    if(req.url === "/current-time"){
        res.write((new Date()).toISOString() + "\n");
        res.end();
    } 
    next();
})
.use(serveStatic(root))
.listen(port);