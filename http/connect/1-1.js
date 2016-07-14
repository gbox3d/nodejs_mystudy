/**
 * Created by gbox3d on 2014. 10. 15..
 */

var http = require('http')
var connect = require('/usr/local/lib/node_modules/connect')

var app = connect()

// respond to all requests
app.use(function(req, res){

    res.end('Hello from Connect!\n');
})

//create node.js http server and listen on port
http.createServer(app).listen(3000)