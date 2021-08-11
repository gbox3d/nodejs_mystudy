import http from "http";

const server_port = 8080

http.createServer((req, res) => {

    console.log(`url : ${req.url}`);
    console.log(`method :  ${req.method}`);

    // 원격주소 얻기 
    try {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`remote address (${ip})`);
    }
    catch (e) {
        console.log(e);
    }

    //url 파싱 , base url을 공란으로 넣어주면 파싱에러남.
    let urlObj = new URL(
        req.url, // url이 상대적인 경로일경우(path만존재) 두번째 인자인 base url을 꼭 지정해주어야한다.
        'http://example.org/' //base url (The base URL to resolve against if the input is not absolute.)
    );

    console.log(`path name : ${urlObj.pathname}`  );
    console.log(`serch ${urlObj.search}`);
    console.log(`hostname : ${urlObj.hostname}`);

    //응답처리 
    let result = { r: 'ok' }

    let header = {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Max-Age': '1000',
        "Access-Control-Allow-Headers": "*" //CORS 정책 허용  * 는 모두 허용 
    }

    if(urlObj.pathname === '/echo') {
        let msg = urlObj.searchParams.get('msg');
        result.echo = `u say ${msg}`
    }

    res.writeHead(200, header);
    res.end(JSON.stringify(result));


}).listen(server_port);

console.log(`listen port ${server_port}`)