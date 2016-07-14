/**
 * Created by gbox3d on 14. 11. 22..
 */

var fs = require('fs');

var data = fs.readFileSync('test.json',{
    encoding : 'utf8'
});

console.log('read utf8mode sync');
console.log(data);

//인코딩없이 바이너리 모드로 읽기
var data = fs.readFileSync('test.json');

console.log('read bin sync');
console.log(data);


console.log('read async');
fs.readFile('test.json',{
    encoding : 'utf8'
},function(err,data) {

    if(err) {

    }else {
        console.log(data);
    }

});
