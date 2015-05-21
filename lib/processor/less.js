var fs = require('fs');
var path = require('path');
var less = require('less');

module.exports = makeLess;

function writeResFile(res, data) {
    res.writeHead(200, {
        "Content-Length": data.length,
        "Content-Type": "text/css; charset=UTF-8"
    });
    res.write(data);
}

function makeLess(root) {
    return function(req, res, next) {
        var file_path = root + req.url;
        var less_path = file_path.split(".")[0] + '.less';
        var data;

        if (path.extname(req.url) == ".css") {
            if (fs.existsSync(file_path)) {
                fs.readFile(file_path, 'utf8', function(err, data) {
                    // if (err) {
                    //     res.statusCode = 404;
                    //     res.end();
                    // }
                    writeResFile(res, data);
                    next();
                });
            } else if (fs.existsSync(less_path)) {
                fs.readFile(less_path, 'utf8', function(err, data) {
                    less.render(data, function(err, output) {
                        writeResFile(res, output);
                        next();
                    });
                });
            } else {
                res.statusCode = 404;
                res.end();
            }
        } else {
            next();
        }



        // fs.readFile(file_path, "utf8", function(err, css_data){
        //     if (err) {
        //         fs.readFile(less_path, 'utf8', function(err, less_data) {
        //             if (err) {
        //                 res.statusCode = 404;
        //                 res.end();
        //             } else {
        //                 less.render(less_data, function(err, output) {
        //                     data = output;
        //                 });
        //             }
        //         })
        //     } else {
        //         data = css_data;
        //     }
        //     res.writeHead(200, {
        //         "Content-Length": data.length,
        //         "Content-Type": "text/css; charset=UTF-8"
        //     });
        //     res.write(data);
        //     next();
        // });

    }
}