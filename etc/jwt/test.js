var jwt = require('jsonwebtoken');

cert = 'JwTsEcReTkEyOrHaShInG'
var token = jwt.sign({ foo: 'bar' },cert );

console.log(token);

jwt.verify(token, cert, function(err, decoded) {
    console.log(decoded.foo) // bar
});