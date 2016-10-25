/**
 * Created by gunpower on 2016. 7. 19..
 */

var ping = require('ping');

var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];

hosts.forEach(function (host) {
    // WARNING: -i 2 argument may not work in other platform like window
    ping.promise.probe(host, {
        timeout: 10,
        extra: ["-i 2"],
    }).then(function (res) {
        console.log(res);
    });
});