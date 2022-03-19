import http from "http";
import nodeStatic from "node-static"

const server_port = 8080
const fileServer = new (nodeStatic.Server)('./www');
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

    //정적웹 서비스 
    fileServer.serve(req, res);

}).listen(server_port);