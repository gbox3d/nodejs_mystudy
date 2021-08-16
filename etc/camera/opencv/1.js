/**
 * Created by gbox3d on 15. 1. 15..
 */


var cv = require('/usr/local/lib/node_modules/opencv');

var camera = new cv.VideoCapture(0);
//var window = new cv.NamedWindow('Video', 0)

setInterval(function() {
    camera.read(function(err, im) {
        if (err) throw err;

        console.log(im);
        im.save('./cam.jpg')

  //      window.show(im);
    //    window.blockingWaitKey(0, 50);
    });
}, 1000);