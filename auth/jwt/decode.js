import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';

console.log(__dirname)
dotenv.config(
    {
        path: `${__dirname}/.env`
    }
);

try {
    var token = fs.readFileSync(`${__dirname}/token.txt `, 'utf8');
    // console.log(req.headers.authorization)
    // console.log(process.env.JWT_SECRET)
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환

    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
}
// 인증 실패
catch (error) {
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
        console.log('토큰이 만료되었습니다.')
 
    }
    console.log(error);

 
}