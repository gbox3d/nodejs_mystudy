import express from 'express'
import morgan from 'morgan'

import user from './user.js'
import product from './product.js'

const app = express()
// const user_router = express.Router()
// const product_router = express.Router()

app.use(morgan('tiny'))

app.use('/api/user',user)
app.use('/api/product',product)

app.listen(8080,()=> {
    console.log(`server run at : 8080`)

})