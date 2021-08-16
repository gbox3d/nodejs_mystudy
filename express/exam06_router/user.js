import express from 'express'
const router = express.Router()

//미들웨어 
router.use((req,res,next)=> {
    console.log('check user auth')
    next()
})

router.route('/').get((req,res)=> {
    res.json({r:'ok',data:'user main'})
})

router.route('/list').get((req,res)=>{
    res.json({r:'ok',data:'user list'})
})

router.route('/entry/:id').get((req,res)=> {
    res.json({r:'ok',id:req.params.id})
})

export default router