
exports.mTestval = 'google';

var mTestval = 'nano';

global.mTestval = 'samsung';

exports.world = function() {
	console.log('hello world : ' + mTestval);
    console.log('go to hell : ' + global.mTestval);
	
}

