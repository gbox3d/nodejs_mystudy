/*

출발지.pipe(목적지)

참고
https://github.com/FEDevelopers/tech.description/wiki/Node.js-Stream-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EC%95%8C%EC%95%84%EC%95%BC%ED%95%A0-%EB%AA%A8%EB%93%A0-%EA%B2%83

 */
// const fs = require('fs');
import fs from 'fs'
const src = fs.createReadStream('out.txt');
const dest = process.stdout
src.pipe(dest)