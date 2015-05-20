var fs = require('fs');
var path = require('path');
var less = require('less');

module.exports = makeLess;

function makeLess(root) {
    return function(req, res, next) {
        var file_path = root + req.url;
        var less_path = file_path.split(".")[0] + '.less';
        var data;

        fs.readFile(file_path, "utf8", function(err, css_data){
            if (err) {
                fs.readFile(less_path, 'utf8', function(err, less_data) {
                    if (err) {
                        res.statusCode = 404;
                        res.end();
                    } else {
                        less.render(less_data, function(err, output) {
                            data = output;
                        });
                    }
                })
            } else {
                data = css_data;
            }
            res.writeHead(200, {
                "Content-Length": data.length,
                "Content-Type": "text/css; charset=UTF-8"
            });
            res.write(data);
            next();
        });

    }
}