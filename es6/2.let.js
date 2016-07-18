/**
 * Created by gunpower on 2016. 7. 18..
 */

var handlers=[];
var k
for(k=0;k<3;k++) {
    var x = k;
    handlers[x] =function () {
        return x;
    }
}

console.log(handlers[0]())
console.log(handlers[1]())
console.log(handlers[2]())


var handlers=[];

for(let k=0;k<3;k++) {
    let x = k;
    handlers[x] =function () {
        return x;
    }
}

console.log(handlers[0]())
console.log(handlers[1]())
console.log(handlers[2]())
