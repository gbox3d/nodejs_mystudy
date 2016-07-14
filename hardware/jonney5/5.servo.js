/**
 * Created by gbox3d on 15. 3. 20..
 */

var five = require("/usr/local/lib/node_modules/johnny-five");
// or "./lib/johnny-five" when running from the source
var board = new five.Board({ port: "/dev/tty.usbmodem1d1141" });

board.on("ready", function() {

    // Create an Led on pin 13 and strobe it on/off
    // Optionally set the speed; defaults to 100ms
    //(new five.Led(13)).strobe();

    var servo = new five.Servo(9);

    //console.log(servo);

// Set the horn to 90degrees
    servo.to(45);



    console.log(servo.io.servoConfig);
    //board.servoConfig(9, 0, 0);

    this.repl.inject({
        servo : servo

    });

    /*

    서보 릴리즈시키기
     min.max 값을 둘다 0으로 하면 서보가 릴리즈된다.

     servo.io.servoConfig(9,0,0);


     */


});