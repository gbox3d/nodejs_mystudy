import express from 'express'
import { logger,autholize } from './mw.js'
import morgan from 'morgan'
const app = express()

//미들웨어
app.use([logger]) //모든 path에 적용
app.use('/api',[morgan('tiny'),autholize]) // api로 시작되는 path 이름에 적용 

app.get('/',logger,(req,res)=> {
    res.send('Home')
})

app.get('/about',logger,(req,res)=> {
    res.send('About')
})

//http://localhost:8080/api/v1/items?apikey=qwer
app.get('/api/v1/items',(req,res)=> {
    res.send('Items')
})

app.listen(8080,()=> {
    console.log('start at 8080')
})