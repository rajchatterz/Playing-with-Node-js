const express = require('express');
const Router = express.Router()

Router.use('/', (req, res, next) => {

    res.send('<h1>Hello from Express</h1>')
})
module.exports = Router;