const fetch = require('node-fetch');

console.log('fetch exam');

(async function () {

    let _res = await (await fetch(`http://localhost:8080/get/test`)).text()

    console.log(_res);

    let _ = await (await (fetch(`http://localhost:8080/post/test`, {
        method: 'POST',
        body: 'hello',
        //브라우져에서는 new Header객체를 사용함
        headers: {
            'Content-Type': 'text/plain'
        } // 이 부분은 따로 설정하고싶은 header가 있다면 넣으세요
    }))).json();
    console.log(_)

})();

