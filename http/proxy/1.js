/**
 * Created by gbox3d on 2014. 3. 3..
 */

var http = require('http');

var options = {
    hostname: "api.flickr.com",
    port: 80,
    method : 'GET',
    path : '/services/feeds/photos_public.gne?jsoncallback=?tag=gun&format=json'
};

var req = http.request(options, function(res) {

    var body_data = '';

    //응답헤더 출력해보기
    for(var item in res.headers) {
        console.log(item + ": " + res.headers[item]);
    }


    res.on('data', function (chunk) {

        body_data +=  chunk;

    });

    //응답을 모두 받고나서 처리해줘야하는것들...
    res.on('end',function() {

        console.log(body_data);

    });

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    if(callback != undefined) {
        callback({error : e.message});
    }
});

req.end();