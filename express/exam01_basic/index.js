// const express = require('express')
import express from 'express'
const app = express()

//static 미들웨어 로 간단한 정적 웹서버 구현
app.use(express.static('www'));
app.use('/text',express.static('text'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

//순서 주의 맨 마지막에 나온다.
app.all('*',(req,res)=> {
  res
  .status(404)
  .send('oops! resource not found')
})
 
app.listen(3000)