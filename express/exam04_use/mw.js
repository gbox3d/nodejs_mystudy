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

export {logger,autholize}