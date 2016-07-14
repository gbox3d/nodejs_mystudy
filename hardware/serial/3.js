/**
 * Created by gunpower on 2016. 3. 11..
 */
var serialport = require("/usr/local/lib/node_modules/serialport");
var baudrate = 9600;

//ls /dev | grep usb
var serialPort = new serialport.SerialPort(
    "/dev/tty.usbserial",
    {
        baudrate: baudrate
        //parser: serialport.parsers.readline("\r\n") //개행문자기준으로 마샬링해주기
    }
);

serialPort.on("open", function () {
    console.log('open at baudrate :' + baudrate);

    //데이터 읽기
    serialPort.on('data', function(data) {
        console.log(data );


    });

});

var theApp = {
    serialPort : serialPort

}

var    repl = require('repl')

var repl_context = repl.start({
    prompt: 'Node.js via stdin> ',
    input: process.stdin,
    output: process.stdout
}).context;

//콘텍스트객체 설정
//theApp을 repl에서 볼수있다
repl_context.theApp = theApp;
