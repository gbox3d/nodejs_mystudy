//https://www.npmjs.com/package/dotenvimport dotenv from 'dotenv'
/*
환경변수를 다루는 패키지로 .env파일에 현경 변수를 정의하고 config함수로 읽어들어
process.env로 사용한다.
*/
dotenv.config({
    path:'.env'
})
console.log(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS)