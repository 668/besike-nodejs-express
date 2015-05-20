var fs = require('fs');
fs.readFile('index1.js', {encoding: 'utf8'}, function(err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
            });