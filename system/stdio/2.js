/**
 * Created by gbox3d on 2014. 8. 13..
 */
var stdin = process.stdin;

var tty = require('tty');
var fs = require('fs');


// without this, we would only get streams once enter is pressed
//리눅스에서만 됨.
stdin.setRawMode(true);


// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
        process.exit();
    }
    console.log(key);
    // write the key to stdout all normal like
    //process.stdout.write( key );
});