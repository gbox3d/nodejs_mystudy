import express from 'express'
import dotenv from 'dotenv'
import memo from './memo.js'
import {MongoClient} from 'mongodb'

dotenv.config();

(async () => {

    const db_client = new MongoClient(process.env.MONGODB_URI);

    try {
        await db_client.connect();
        console.log(`connect db ok`)

        const app = express();

        app.use(express.static('www'));
        app.use(express.json());
        app.use('/api/v1/memo',memo(db_client))

        app.get('/hello', function (req, res) {
            res.send('Hello World')
        })
        
        //순서 주의 맨 마지막에 나온다.
        app.all('*', (req, res) => {
            res
                .status(404)
                .send('oops! resource not found')
        })

        app.listen(process.env.PORT, () => {
            console.log(`start at : ${process.env.PORT}`);
        })

    }
    catch (e) {
        console.log(e)
    }
})();
