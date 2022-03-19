const jwt = require('jsonwebtoken');

cert = 'JwTsEcReTkEyOrHaShInG'
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NDc1MTE3MTh9.q_D1z02FO6MJLowoXWvOpBNBIGY1ZFSTQ7i0IP94fQE'
try {
    // console.log(req.headers.authorization)
    // console.log(process.env.JWT_SECRET)
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환
    decoded = jwt.verify(token, cert);

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