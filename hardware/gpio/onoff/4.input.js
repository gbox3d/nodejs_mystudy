/**
 * Created by gunpower on 2016. 3. 22..
 */
var Gpio = require("/usr/local/node/lib/node_modules/onoff").Gpio;

var button = new Gpio(14,'in','both')
button.watch(
    function(err,value) {
        console.log(value)
    }
);