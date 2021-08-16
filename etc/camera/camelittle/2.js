/**
 * Created by gbox3d on 15. 1. 15..
 */

var fs = require('fs');

var Camelittle = require('camelittle');


var clInstance = new Camelittle({
    device: '/dev/video1',
    resolution: '640x480',
    frames : 5,
    delay : 1
});

function captureLoop() {
    clInstance.grab(function(err, image){
        fs.writeFileSync('callback.jpg', image, 'binary');

        console.log('capture ok..');

        setTimeout(function () {
            console.log('start next..');
            captureLoop();
        },10000)

    });

}


captureLoop();


