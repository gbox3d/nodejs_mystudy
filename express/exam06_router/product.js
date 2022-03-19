import express from 'express'

const router = express.Router()

router.use('/insert',express.json()) //json body parser mw


router.route('/').get((req,res)=>{
    res.json({r:'ok',data:'product main'})
})

router.route('/list').get((req,res)=>{

    res.json({r:'ok',data:'product list'})
})

router.route('/insert').post((req,res)=> {

    res.json({r:'ok',body:req.body})
})

export default router