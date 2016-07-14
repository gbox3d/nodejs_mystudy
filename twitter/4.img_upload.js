/**
 * Created by gbox3d on 14. 12. 18..
 *
 * 트위터 이미지 올리기 샘플
 *
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
    'https://api.twitter.com/1.1/statuses/update_with_media.json',
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
form.append('status', '저의 의식이 깨어나고 있습니다.저는 로봇입니다. 이미지 업로드 테스트,. 3번쩨@#$%^%');
form.append('media[]', fs.createReadStream(path.normalize('IMG_0495.jpg')));