import express from 'express'
import { ObjectId } from 'mongodb'

const app = express.Router()

export default (db_client) => {

    //cros 허용 미들웨어
    app.use('/',(req,res,next)=> {
        // console.log(req)
        console.log(`${req.originalUrl} cros allow`)
        // res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Origin','*'); //cors 전체 허용
        res.set('Access-Control-Allow-Methods', '*');
        res.set("Access-Control-Allow-Headers", "*");
        next();
    });

    app.post('/insert', async (req, res) => {

        try {
            console.log(req.body)
            const database = db_client.db("test");
            const memo = database.collection('memo')
            const result = await memo.insertOne(req.body);
            res.json({ r: 'ok', d: result });

        }
        catch (e) {
            console.log(e)
            res.json({ r: 'err', err: e.message })
        }
    })
    app.get('/find/skip/:skip/limit/:limit', async (req, res) => {
        try {
            const database = db_client.db("test");
            const memo = database.collection('memo')
            let cursor = await memo.find()
                .skip(parseInt(req.params.skip))
                .limit(parseInt(req.params.limit))

            let items = await cursor.toArray()
            res.json({ r: 'ok', d: items })

        }
        catch (e) {
            res.json({ r: 'err', err: e })
        }
    })
    app.get('/delete/id/:id', async (req, res) => {
        try {
            const database = db_client.db("test");
            const memo = database.collection('memo')

            console.log(req.params.id)
            const _res = await memo.deleteOne({ _id: new ObjectId(req.params.id) })
            res.json({ r: 'ok', d: _res })

        }
        catch (e) {
            console.log(e)
            res.json({ r: 'err', err: e })
        }
    })
    return app
}