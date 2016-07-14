/**
 * Created by gbox3d on 15. 5. 18..
 */
var addon = require('./build/Release/addon');
var addon2 = require('./build/Release/plus');

console.log(addon.hello()); // 'world'
console.log( 'This should be eight:', addon2.add(3,5) );