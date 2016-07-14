/**
 * Created by gbox3d on 15. 7. 21..
 */
var gpio = require("/usr/local/lib/node_modules/gpio");
// Flashing lights if LED connected to GPIO22
var gpio18 = gpio.export(18, {
    ready: function() {
        intervalTimer = setInterval(function() {
            gpio18.set();
            setTimeout(function() { gpio18.reset(); }, 500);
        }, 1000);
    }
});
