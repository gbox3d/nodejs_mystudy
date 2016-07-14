var express = require('../../../../node_pub/node_modules/express');
var os = require('os');

var app = express();//module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/logget', function(req, res){
  console.log('get to log');
  console.log(req.query.callback);
  console.log(req.param('somedata'))
  
  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8')  
  res.send(req.query.callback + '({"something": "rather", "more": "pork", "tua": "tara",' + '"echo":"' + req.param('somedata')  + '" });');  
});

app.listen(3000);
console.log('start host name : ' + os.hostname());
console.log('system info total mem : ' +  os.totalmem());
