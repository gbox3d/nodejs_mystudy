/**
 * Created by gunpower on 2015. 11. 25..
 */

var fs = require('fs')

fs.readdir('./',function(err,files) {

    console.log(files);

    for(var i=0;i<files.length;i++) {

        //파일과 디랙토리 구분하기
        fs.stat( './' + files[i],(function() {

                var file = files[i];
                return function(err,status) {

                    if(status.isDirectory()) {
                        console.log( file+ ' is a directory')
                    }
                    else {
                        console.log(file + ' is a file')
                    }


                }
                //----------
            })()
        );
    }
    //--------------
});