/**
 * Created by gbox3d on 15. 3. 5..
 */

/*
const serialport = require("serialport");
const baudrate = 115200;

//ls /dev | grep usb
var serialPort = new serialport(
    "/dev/tty.wchusbserial142420", {
        baudrate: baudrate
            //parser: serialport.parsers.readline("\r\n") //개행문자기준으로 마샬링해주기
    }
);


serialPort.on("open", function() {
    console.log('open at baudrate :' + baudrate);


    setTimeout(function() {

        console.log('send test');
        serialPort.write('QV', function() {});

    }, 3000);

    //데이터 읽기
    serialPort.on('data', function(data) {
        console.log(data);
    });

});
*/


const serialport = require('serialport')
    //const createTable = require('data-table')

serialport.list((err, ports) => {
    console.log('ports', ports);
    if (err) {
        document.getElementById('error').textContent = err.message
        return
    } else {
        document.getElementById('error').textContent = ''
    }

    if (ports.length === 0) {
        document.getElementById('error').textContent = 'No ports discovered'
    }

    ports.forEach(port => { document.getElementById('ports').innerHTML += JSON.stringify(port) })

    /*
        const headers = Object.keys(ports[0])
        const table = createTable(headers)
        let tableHTML = ''
        table.on('data', data => tableHTML += data)
        table.on('end', () => document.getElementById('ports').innerHTML = tableHTML)
        ports.forEach(port => table.write(port))
        table.end();
        */
})