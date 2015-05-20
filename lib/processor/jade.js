var fs = require('fs');
var path = require('path');
var jade = require('jade');

module.exports = makeJade;

function makeJade(root) {
    return function(req, res, next) {
        var file_path = root + req.url;
        var jade_path = file_path.split(".")[0] + '.jade';

        fs.readFile(file_path, 'utf8', function(err, data) {
            if (err){
                var html_data = jade.renderFile(jade_path, null);
                if (html_data) {
                    data = html_data;
                    res.write(data);
                } else {
                    res.statusCode = 404;
                    res.end();
                }
            } else {
                res.write(data);
            }

            res.writeHead(200, {
                "Content-Length": data.length,
                "Content-Type": "text/html; charset=UTF-8"
            });
            next();
        });
    }
}
