/**
 * Created by gbox3d on 14. 12. 18..
 */

var config_api_key = require('./config_api_key');
var twitter_update_with_media = require('./twitter_update_with_media');

var tuwm = new twitter_update_with_media({
    consumer_key: 'cIBB3Vi5gZwTeezwLsDQKM1Fy'
    , consumer_secret: 'eQbIg5txEbTcAmchefSU8JNUabmt7TmGrSzj0IDPbMxUUMG5Pn'
    , token: '611887551-NhmfLd8bIDOA59WSElTyoqrwQ7v4jCFexc56wgom'
    , token_secret: 'qw3gVYyyXG5dk6I2vU6WKxxECX0aHNc87CfI8Klymsw'

});

tuwm.post('This is a test', './IMG_0494.jpg', function(err, response) {
    if (err) {
        console.log(err);
    }
    console.log(response);
});