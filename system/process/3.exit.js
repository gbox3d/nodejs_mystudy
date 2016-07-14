/**
 * Created by gunpower on 2015. 11. 27..
 */

process.on('exit',function() {
    console.log('on exit event');
})

//setTimeout(function() {
//    console.log('it is run?')
//},5000)

process.stdin.resume();

process.on('SIGINT', function() {
    //console.log('Got SIGINT.  Press Control-D to exit.');
    console.log('Got SIGINT. event ');
    process.exit(0); //여기서 exit 이벤트 발생
});