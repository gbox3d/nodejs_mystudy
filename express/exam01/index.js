// const express = require('express')
import express from 'express'
const app = express()

app.use(express.static('www'));
app.use('/text',express.static('text'));

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)