/**
 * Created by gbox3d on 14. 12. 17..
 */

//타임라인얻기 예제

fs = require('fs');

path = require('path');

request = require('request');


var auth_settings  = {
    consumer_key: 'cIBB3Vi5gZwTeezwLsDQKM1Fy',
    consumer_secret: 'eQbIg5txEbTcAmchefSU8JNUabmt7TmGrSzj0IDPbMxUUMG5Pn',
    token: '611887551-NhmfLd8bIDOA59WSElTyoqrwQ7v4jCFexc56wgom',
    token_secret: 'qw3gVYyyXG5dk6I2vU6WKxxECX0aHNc87CfI8Klymsw'
};


request.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    {
        oauth : auth_settings
    },
    function(err, response) {
        if (err) {

            console.log(err);
        }

        console.log(JSON.parse(response.body));
    }
);

