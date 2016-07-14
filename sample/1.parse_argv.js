/**
 * Created by gbox3d on 2014. 2. 28..
 */


process.argv.forEach(function(val, index, array) {

    if(val.indexOf('=') > 0) {

        var tokens = val.split('=');

        if(tokens[0] == 'echo') {
            console.log('echo :' + tokens[1])
        }

    }


});