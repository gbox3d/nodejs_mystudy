import fs from 'fs'
const dest = fs.createWriteStream('out.txt');
const src = process.stdin
src.pipe(dest)