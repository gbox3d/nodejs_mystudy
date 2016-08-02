/**
 * Created by gbox3d on 2014. 5. 29..
 */
var theApp = {
    port : '8080',
    version: '0.0.1',
    module_path: '/usr/local/lib/node_modules/'
}
// note, io.listen(&lt;port&gt;) will create a http server for you
var io = require( theApp.module_path + 'socket.io')(8080);

io.sockets.on('connection', function (socket) {

    console.log('connect');

    io.sockets.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {

        console.log('disconnect');
        io.sockets.emit('user disconnected');


    });
});
