import express from 'express'
const app = express()

//미들웨어
//  req => middleware => res
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

const autholize = (req,res,next)=> {
    if(req.query.apikey == 'qwer') {
        console.log('autho success')
        next()
    }
    else {
        res.send('auth failed')
    }
}

app.get('/',logger,(req,res)=> {
    res.send('Home')
})

app.get('/about',logger,(req,res)=> {
    res.send('About')
})

//http://localhost:8080/api/v1/items?apikey=qwer
app.get('/api/v1/items',[logger,autholize],(req,res)=> {
    res.send('Items')
})

app.listen(8080,()=> {
    console.log('start at 8080')
})