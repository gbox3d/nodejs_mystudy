/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 17.
 * Time: 오전 11:40
 * To change this template use File | Settings | File Templates.
 */


var exec = require('child_process').exec;
var spwan = require('child_process').spawn;

var fs = require('fs');

fs.open('/sys/class/gpio/export', 'a', 666, function(e, fd) {
    fs.write(fd, '17' , null, null, null, function() {
        fs.close(fd, function() {
            console.log('port 4 exported!');

            fs.open('/sys/class/gpio/gpio4/direction','a',666,function(e,fd) {
                fs.write(fd,'out',null,null,null,function() {
                    fs.close(fd,function() {
                        console.log('set port 4 direction out');

                        fs.open('/sys/class/gpio/gpio4/value','a',666,function(e,fd) {
                            fs.write(fd,'1',null,null,null,function() {
                                fs.close(fd,function() {
                                    console.log('set port 4 value 1');
                                })

                            })
                        })

                    });

                })

            });

        });
    });
});


/*
exec('echo "4" > /sys/class/gpio/export',function(err, stdout, stderr) {

        if (err) throw err;
        else console.log(stdout);

        exec('echo "out" > /sys/class/gpio/gpio4/direction',function(err, stdout, stderr) {

                if (err) throw err;
                else console.log(stdout);

                //켜기
                exec('echo "1" > /sys/class/gpio/gpio4/value',function(err, stdout, stderr) {
                        if (err) throw err;
                        else console.log(stdout);
                    }
                );

                setTimeout(function() {

                    //끄기
                    exec('echo "0" > /sys/class/gpio/gpio4/value',function(err, stdout, stderr) {
                            if (err) throw err;
                            else console.log(stdout);

                            exec('echo "4" > /sys/class/gpio/unexport',function(err, stdout, stderr) {
                                    if (err) throw err;
                                    else console.log(stdout);
                                }
                            );

                        }
                    );
                },3000);


            }
        );



    }
);

*/




