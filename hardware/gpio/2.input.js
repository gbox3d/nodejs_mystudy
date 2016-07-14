/**
 * Created by gbox3d on 15. 7. 21..
 * 풀업저항

 - --sw^----*---<gnd>-------- +
            |
          gpio4

 눌러지면 0, 안눌르면 1

 */


var gpio = require("/usr/local/lib/node_modules/gpio");

var gpio4 = gpio.export(4, {
    direction: "in",
    ready: function() {
        // bind to the "change" event
        gpio4.on("change", function(val) {
            // value will report either 1 or 0 (number) when the value changes
            console.log(val)
        });
    }
});