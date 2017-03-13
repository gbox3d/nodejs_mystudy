const async = require("async")

async.waterfall([
        (next) => {
            next(null)
        }

    ],
    (err, result) => {

        console.log('test ok')

    }
)