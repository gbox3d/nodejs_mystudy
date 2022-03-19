// var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';

console.log(__dirname)
dotenv.config(
    {
        path: `${__dirname}/.env`
    }
);

var token = jwt.sign(
    { foo: 'bar' },
    process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h'
}
);

console.log(token);
fs.writeFileSync(`${__dirname}/token.txt `, token);
