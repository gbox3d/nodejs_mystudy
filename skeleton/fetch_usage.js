import fetch from "node-fetch"

(async function() {

    let _res = await (await (fetch('http://localhost:8001/rest/post/test', {
        method: 'POST',
        body: 'hello post',
        headers: {
            'Content-Type': 'text/plain',
            'test-msg' : 'hi'
        } 
    }))).json();

    console.log(_res);


    _res = await (await fetch(`http://localhost:8001/rest/get/test?name=gbox&number=9545`)).json()
    console.log(_res)





})();