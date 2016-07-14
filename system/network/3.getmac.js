/**
 * Created by gunpower on 2015. 10. 21..
 */

    //첫번째 방법
var getmac = require('getmac');
getmac.getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
})

//두번째 방법
var macaddress = require('node-macaddress');
console.log(JSON.stringify(macaddress.networkInterfaces(), null,2));