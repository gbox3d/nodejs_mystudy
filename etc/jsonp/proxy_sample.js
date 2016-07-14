/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 6.
 * Time: 오전 10:34
 * To change this template use File | Settings | File Templates.
 */

var $ = require('../../../../node_pub/node_modules/jquery');


$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'callback',
    url: 'http://localhost:3000/logget',
    data : {somedata:'hello'},
    success: function(data, textStatus, jqXHR) {

        console.log(data);

    },
    complete: function(jqXHR, textStatus) {
        console.log('complete');


    },
    error: function(qXHR, textStatus, errorThrown) {
        console.log('error');


    }
});
