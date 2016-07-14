/**
 * Created by gunpower on 2016. 5. 18..
 */

//http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

//해쉬키생성
function Gene32BitHash(strTemp) {
    var hash = 0, i, chr, len;
    if (strTemp.length === 0) return hash;
    for (i = 0, len = strTemp.length; i < len; i++) {
        chr   = strTemp.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash


};

//리틀엔디언 16진수 바이트로 바꾸기 
function toLeHex(val,bytes_count) {
    const buf = new Buffer(bytes_count);
    buf.writeInt32LE(val,0);

    var temp = ''
    for(var i=0;i<4;i++) {
        temp += buf[i].toString(16)
    }

    return temp;

}

console.log( toLeHex( Gene32BitHash('{"a":1}'),4 ) )

//function Gene32BitHash_Hex(strTemp)
//console.log( ('{"a":1}').hashCode() )