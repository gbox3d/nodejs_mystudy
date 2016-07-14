/**
 * Created by gbox3d on 15. 3. 20..
 */



var five = require("johnny-five");

var board = new five.Board({ port: "/dev/tty.usbmodem1d1151" });

board.on("ready", function() {
    var servo = new five.Servo(9);
    var animation = new five.Animation(servo);

    // Create an animation segment object
    animation.enqueue({
        duration: 2000,
        cuePoints: [0, 0.25, 0.5, 0.75, 1.0],
        keyFrames: [ {degrees: 0}, {degrees: 135}, {degrees: 45}, {degrees: 180}, {degrees: 0}]
    });
});