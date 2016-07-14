/**
 * Created by gunpower on 2016. 3. 15..
 */

    var module_path = '/usr/local/node/lib/node_modules/'

var SPI = require(module_path + 'spi');

var spi = new SPI.Spi('/dev/spidev0.0', {
    'mode': SPI.MODE['MODE_0'],  // always set mode as the first option
    'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low
}, function(s){s.open();});

//var txbuf = new Buffer([ 0x23, 0x48, 0xAF, 0x19, 0x19, 0x19 ]);
//0x0d -> '\n' 이다.
//테스트용 아두이노 /n 으로 끝어서 출력한다
var txbuf = new Buffer([ 0x41, 0x42, 0x43, 0x44, 0x0d, 0x0a ]);
var rxbuf = new Buffer([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

spi.transfer(txbuf, rxbuf, function(device, buf) {
    // rxbuf and buf should be the same here
    var s = "";
    for (var i=0; i < buf.length; i++)
        s = s + buf[i] + " ";
    console.log(s + "- " + new Date().getTime());
});
