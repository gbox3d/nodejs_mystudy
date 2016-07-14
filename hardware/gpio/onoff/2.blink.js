/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 2.
 * Time: 오후 3:30
 * To change this template use File | Settings | File Templates.
 */

var Gpio = require('../../../../node_pub/node_modules/onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(17, 'out'),    // Export GPIO #23 as an output.
    iv;

// Toggle the state of the LED on GPIO #23 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
iv = setInterval(function() {
    led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)

    console.log('now play blink now...');

}, 200);


// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    led.writeSync(0);  // Turn LED off.
    led.unexport();    // Unexport GPIO and free resources

    console.log("finished 5sec..bye~ :)");
}, 5000);
