var fs = require('fs');
var path = require('path');
var jade = require('jade');

module.exports = makeJade;

function makeJade(root) {
    return function(req, res, next) {
        var file_path = root + req.url;
        var jade_path = file_path.split(".")[0] + '.jade';

        if (fs.existsSync(file_path)) {
            fs.readFile(file_path, {encoding: 'utf8'}, function(err, data) {
                if (err) { throw err; }
                writeResult(res, data);
            })
        } else if (fs.existsSync(jade_path)) {
            var html_data = jade.renderFile(jade_path, null);
            writeResult(res, html_data);
        } else {
            res.statusCode = 404;
            res.end();
        }
        next();
    };
}

function writeResult(res, data) {
    res.setHeader("Content-Type", 'text/html; charset=UTF-8');
    res.setHeader("Content-Length", data.length);
    res.end(data);
}