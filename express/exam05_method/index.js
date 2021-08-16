import express from 'express'

const app = express()

//static asset
app.use(express.static('./www'))

app.use('/api/v1',
[
    express.urlencoded({ extended: false }),//parse form body data, Content-Type : application/x-www-form-urlencoded(필수)
    express.json() // parse json , Content-Type : application/json;charset=UTF-8 (필수)
]
)

app.use('/api/v2',(req, res, next) => {
    
    console.log('raw body middle ware')
    console.log(req.rawHeaders)

    let rawBody = ''
    req.setEncoding('utf-8')
    req.on('data', function (chunk) {
        rawBody += chunk;
    });

    req.on('end', function () {
        console.log(rawBody)
        req.rawBody = rawBody
        next();
    });
})


app.post('/api/v1/login/treditional', (req, res) => {
    
    console.log(req.body.name)

    res.status(200)
        .send(`<h1>post done ${req.body.name} </h1>`)
})

app.post('/api/v1/login/axios', (req, res) => {

    res.status(200)
        .json({r:'ok',person : req.body.name})
})

app.post('/api/v2/login/ajax',(req,res)=> {

    res.status(200)
    .json({
        r:'ok',name:req.rawBody
    })

})

app.listen(8080, () => {
    console.log('server run at 8080')
})


