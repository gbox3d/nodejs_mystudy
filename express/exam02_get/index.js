import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const server_port = process.env.PORT

app.get('/',(req,res)=> {
    
    res
    .set('Content-Type', 'text/html') //헤더설정
    .status(200) //상태코드
    .send('<h1>Home page</h1>') // playload
})
app.get('/about',(req,res)=> {
    
    res
    .set('Content-Type', 'text/html') //헤더설정
    .status(200) //상태코드
    .send('<h1>About page</h1>') // playload
})

app.get('/form_page',(req,res)=> {
    res.sendFile(path.resolve('../www/post_form.html'))
})

app.get('/json_data',(req,res)=> {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:8080') //cors 에러 대비책
    res.set('Access-Control-Allow-Origin', '*') //cors 에러 대비책
    res.json({
        name : 'tommy',
        age : 21,
        contry : 'usa'
    })
})

//parameter
//req exam : localhost:8080/api/v1/name/gbox/age/51
app.get('/api/v1/name/:name/age/:age',(req,res)=> {
    console.log(req.params)
    console.log(req.path)
    res.json({r:'ok',params : req.params})
})

//query
//req exam : http://localhost:8080/api/v1/query?name=gbox&age=21
app.get('/api/v1/query',(req,res)=> {
    console.log(req.query)

    res.json({r:'ok',query : req.query})
})

//순서 주의 맨 마지막에 나온다.
app.all('*',(req,res)=> {
    res
    .status(404)
    .send('oops! resource not found')
})


app.listen(server_port,()=> {
    console.log(`cuurent path : ${path.resolve()}` );
    console.log(`server start at : ${server_port}`)
})