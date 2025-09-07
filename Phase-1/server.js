const fs = require('fs')
const http = require('http')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    const num = _.random(20);
    console.log(num);
    res.setHeader('Content-Type', 'text/html');

    let path = './view/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            break;

        case '/about':
            path += 'about.html';
            break;

        case '/hii':
            res.statusCode = 301;
            res.setHeader('Location', '/');
            res.end();
            break;


        default:
            path += 'error.html'
            break;
    }


    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.end(data);
        }
    })


});

server.listen(3006, 'localhost', () => {
    console.log('access granted');

});


