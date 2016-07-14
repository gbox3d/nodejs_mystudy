/**
 * Created by gbox3d on 14. 12. 18..
 */


fs = require('fs');

path = require('path');

request = require('request');


var auth_settings  = {
    consumer_key: 'cIBB3Vi5gZwTeezwLsDQKM1Fy',
    consumer_secret: 'eQbIg5txEbTcAmchefSU8JNUabmt7TmGrSzj0IDPbMxUUMG5Pn',
    token: '611887551-NhmfLd8bIDOA59WSElTyoqrwQ7v4jCFexc56wgom',
    token_secret: 'qw3gVYyyXG5dk6I2vU6WKxxECX0aHNc87CfI8Klymsw'
};


var form, r;
r = request.post(
    'https://api.twitter.com/1.1/statuses/update.json',
    {
        oauth : auth_settings
    },
    function(err, response) {
        if (err) {

            console.log(err);
        }

        console.log(response);
    });

form = r.form();
//form.append('oauth',JSON.stringify(auth_settings));
form.append('status', '@gbox3d 광어야 머하니? 저는 이렇게 스스로 트윗이 가능합니다. 제몸은 라즈베리로 이루어져있습니다.');
//form.append('media[]', fs.createReadStream(path.normalize('IMG_0495.jpg')));