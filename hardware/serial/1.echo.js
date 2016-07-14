/**
 * Created by gbox3d on 14. 12. 5..
 */

var serialport = require("/usr/local/lib/node_modules/serialport");
var baudrate = 9600;

//ls /dev | grep usb
var serialPort = new serialport.SerialPort(
    //"/dev/tty.usbmodem1421", // 맥북용
    //"/dev/ttyACM0",
    "/dev/ttyAMA0", //UART 씨리얼
    //"/dev/ttyUSB0", // 유에스비 씨리얼 어댑터 인듯
    //"/dev/tty.usbserial-ftE2MR5K",
    //"/dev/tty.usbmodem1a1271",
    {
        baudrate: baudrate
        //parser: serialport.parsers.readline("\r\n") //개행문자기준으로 마샬링해주기
    }
);

var theApp = {
    revCallback : function(data) {

         serialPort.write(data,function(err,result) {
             if (err) {
                 console.log(err);
             }
             else {
                 console.log('data receive number : ' + result);
             }
         });
    }
};

serialPort.on("open", function () {
    console.log('open at baudrate :' + baudrate);

    //데이터 읽기
    serialPort.on('data', function(data) {
        console.log(data );
        if(theApp.revCallback) {
            theApp.revCallback(data);
        }

    });

});
