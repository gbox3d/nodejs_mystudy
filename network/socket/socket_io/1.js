/**
 * Created by gbox3d on 2014. 5. 29..
 */

var theApp = {
    version: '0.0.2',
    module_path: '/usr/local/lib/node_modules/'
}

var app = require('http').createServer(handler);
var io = require( theApp.module_path + 'socket.io')(app);
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {

    setInterval(function() {
            console.log('check');
            socket.emit('news', { hello: 'world' });
        },1000
    );



    socket.on('my other event', function (data) {
        console.log(data);
    });
});