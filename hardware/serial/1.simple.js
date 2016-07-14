/**
 * Created by gbox3d on 15. 3. 3..
 */

var serialport = require("/usr/local/lib/node_modules/serialport");
var baudrate = 9600;

//ls /dev | grep usb
var serialPort = new serialport.SerialPort(
    //"/dev/ttyAMA0", //UART 씨리얼
    "/dev/tty.usbmodem1411",
    {
        baudrate: 9600//,
        //parser: serialport.parsers.readline("\r\n") //개행문자기준으로 끊어주기
    }
);

serialPort.on("open", function () {
    console.log('open at baudrate :' + baudrate);

    //데이터 읽기
    serialPort.on('data', function(data) {
        console.log(data );

        serialPort.write(data,function(err,result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('data receive number : ' + result);
            }
        });


    });

});
