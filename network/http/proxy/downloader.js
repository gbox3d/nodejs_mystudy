/**
 * Created by gbox3d on 2014. 10. 7..
 */

var http = require('http');
var fs = require('fs');

//http://artsimg.mk.co.kr/paper/data/news/images/2010/11/1691_L_1289736258.jpg
var options = {
    hostname: "artsimg.mk.co.kr",
    port: 80,
    method : 'GET',
    path : '/paper/data/news/images/2010/11/1691_L_1289736258.jpg'
};

var req = http.request(options, function(res) {

    //크기가 0인 빈 버퍼만들기
    var body_data = new Buffer(0);

    //응답헤더 출력해보기
    for(var item in res.headers) {
        console.log(item + ": " + res.headers[item]);
    }


    res.on('data', function (chunk) {

        //바이너리데이터 누적시키기
        body_data = Buffer.concat([body_data, chunk]);
        //console.log(body_data.length);

    });


    //응답을 모두 받고나서 처리해줘야하는것들...
    res.on('end',function() {

        fs.writeFile("temp.jpg", body_data, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

    });

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    if(callback != undefined) {
        callback({error : e.message});
    }
});

req.end();