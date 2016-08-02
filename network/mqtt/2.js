/**
 * Created by gbox3d on 15. 5. 15..
 */

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://goorume.cafe24.com');

client.on('connect', function () {
    client.subscribe('gbox');
    client.publish('gbox', '안녕~');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end();
});