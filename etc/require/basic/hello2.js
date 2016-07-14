/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 20.
 * Time: 오후 3:49
 * To change this template use File | Settings | File Templates.
 */


var mTestval = 'samsung';

exports.mTestval = mTestval;
global.mTestval = 'nano';

mTestval = 'google';


exports.world = function() {
    console.log('hello world : ' + mTestval);
    console.log('go to hell : ' + global.mTestval);
    console.log('welcome to : ' + exports.mTestval);

}

