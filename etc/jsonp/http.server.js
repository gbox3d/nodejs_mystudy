/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 27.
 * Time: 오후 8:39
 * To change this template use File | Settings | File Templates.
 */

var http = require('http');
var UrlParser = require('url');

http.createServer(function (req, res) {

    console.log('request received');

    var result = UrlParser.parse(req.url,true);

    res.writeHead(200, {'Content-Type': 'application/json'});
    //res.end('_testcb(\'{"message": "Hello world!"}\')');
    res.end(
        result.query.callback
        + '({"something": "rather", "more": "pork", "tua": "tara",'
        + '"echo":"' + result.query.somedata  + '" });');

}).listen(3000);

console.log('jsop http server exam..at port 3000');