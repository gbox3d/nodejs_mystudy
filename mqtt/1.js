/**
 * Created by gbox3d on 15. 5. 15..
 */

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://goorume.cafe24.com');
//var client  = mqtt.connect('mqtt://222.105.216.51');

client.on('connect', function () {

    console.log('connect ok');

    client.subscribe('gbox');

    console.log('subscribe  ok');

    client.publish('gbox', 'Hello mqtt');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end();
});