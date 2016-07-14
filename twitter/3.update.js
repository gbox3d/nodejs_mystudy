/**
 * Created by gbox3d on 14. 12. 17..
 */

var config_api_key = require('./config_api_key');

var Twit = require('twit')

var T = new Twit(config_api_key)


//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: '현재 시간은 ' + (new Date()) }, function(err, data, response) {
    console.log(data);
    //console.log(response);

});
