/**
 * Created by gbox3d on 15. 1. 15..
 */

//설치법
/*

apt-get install fswebcam
npm install camelittle


*/

var fs = require('fs');

var Camelittle = require('camelittle');


var clInstance = new Camelittle({
    device: '/dev/video1',
    resolution: '640x480',
    frames: 5
});



clInstance.on('frame', function (image) {
    fs.writeFileSync('image.jpg', image, 'binary');
});

clInstance.on('error', function (err) {
    console.error(err);
});

clInstance.grab({})