/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var child_proc = require('child_process');


//디바이스 리스트 출력 마운트된 
child_proc.exec('ls /dev', function(err, stdout, stderr) {

    var strTemp = stdout;
    console.log(stdout);
    
});