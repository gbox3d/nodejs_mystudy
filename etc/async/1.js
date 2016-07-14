/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 27.
 * Time: 오후 5:55
 * To change this template use File | Settings | File Templates.
 */


Q = require('../../../../node_pub/node_modules/q');



function step1(callback) {

    console.log('start step1');

    //callback('hello');
}

function step2(param,callback) {

    //callback('step2' + param );
    console.log('step2');
}


function step3(param,callback) {

    console.log('step3');

    //callback('step3' + param );
}

function step4(param,callback) {
    console.log('step4');

    //callback('step4' + param );
}

      /*
step1(function (value1) {
    step2(value1, function(value2) {
        step3(value2, function(value3) {
            step4(value3, function(value4) {
                console.log(value4);
            });
        });
    });
});
*/

Q.fcall(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) {
        // Do something with value4
        console.log('finish');
    }, function (error) {
        console.log(error);
        // Handle any error from step1 through step4
    })
    .done();

console.log('doom of pyramid');
