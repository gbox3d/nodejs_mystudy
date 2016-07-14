/**
 * Created by gunpower on 2015. 11. 24..
 */

var Player = require('/usr/local/lib/node_modules/player');

// create player instance
var player = new Player(['./welcome.mp3','sogota_2_01.mp3']);
//var player = new Player('./russian.mp3');

//player.play();

setTimeout(function() {

    // play now and callback when playend
    /*player.play(function(err, player){
        console.log('playend!');
    });
    */


},5000);

/*
player.on('playend',function(item){
    // return a playend item
    console.log('src:' + item + ' play done, switching to next one ...');
});
*/

// event: on error
player.on('error', function(err){
    // when error occurs
    console.log(err);
});

console.log('test')