/**
 * Created by gbox3d on 15. 3. 20..
 */
var Board = require("firmata").Board;
var board = new Board("/dev/tty.usbmodem1421");

board.on("ready", function() {
    var degrees = 10;
    var incrementer = 10;

    // This will map 0-180 to 1000-1500
    //board.servoConfig(9, 1000, 1500);

    var servo_pin = 9;

    console.log('attach servo');
    board.pinMode(11, board.MODES.SERVO);
    board.pinMode(10, board.MODES.SERVO);
    board.pinMode(9, board.MODES.SERVO);
    board.pinMode(8, board.MODES.SERVO);

    board.servoWrite(11, 0);
    board.servoWrite(10, 0);
    board.servoWrite(9, 0);
    board.servoWrite(8, 0);

    setTimeout(function() {

        board.servoWrite(11, 180);
        board.servoWrite(10, 180);
        board.servoWrite(9, 180);
        board.servoWrite(8, 180);

        setTimeout(function() {

            board.servoWrite(11, 90);
            board.servoWrite(10, 90);
            board.servoWrite(9, 90);
            board.servoWrite(8, 90);

            setTimeout(function() {

                //board.servoConfig(9, 0, 0);
                board.pinMode(11, board.MODES.INPUT); //핀모드 서보가 아닌것으로 바꿔주면 서보가 릴리즈된다.
                board.pinMode(10, board.MODES.INPUT);
                board.pinMode(9, board.MODES.INPUT); //핀모드 서보가 아닌것으로 바꿔주면 서보가 릴리즈된다.
                board.pinMode(8, board.MODES.INPUT);

                console.log('detach servo');

            },1000);

        },1000)


    },1000);


});