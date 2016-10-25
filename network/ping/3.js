/**
 * Created by gunpower on 2016. 7. 19..
 */

const ping = require('ping');

const hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];

var cfg = {
    timeout: 10,
    // WARNING: -i 2 may not work in other platform like window
    extra: ["-i 2"],
};

hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    }, cfg);
});