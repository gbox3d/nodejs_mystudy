https = require('https')
fs = require('fs');

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};
https.createServer(options, function(req, res){

  console.log(req);
  //res.writeHead(200);
  response.writeHead(200, {'Content-Type': 'text/html'});
  res.end("<h1>Hello Secure World</h1>\n");
}).listen(8080);
