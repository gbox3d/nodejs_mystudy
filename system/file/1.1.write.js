/**
 * Created by gbox3d on 14. 11. 22..
 */

var fs = require('fs');

var data = {
    name : "lee",
    age : 44,
    write_year : 2014
}

fs.writeFileSync('test.json',JSON.stringify(data),{
    encoding : 'utf8'
});
console.log('success write sync');


fs.writeFile('test_write_async.json',
    JSON.stringify(data),
    {
        encoding : 'utf8'
    },
    function(err) {

        if(err) {

            console.log('err :' + err);

        }
        else {
            console.log('success write async');
        }

    }
); //비동기 함수




