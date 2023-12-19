const express = require('express');
const app = express()
app.use('/', (req, res, next) => {
    console.log("first Middleware")
    next()
})
app.get('/', (req, res, next) => {
    res.send('<h1>Home</h1>')

})
app.use('/users', (req, res, next) => {
    console.log('Second Middleware')
    next()

})
app.get('/users', (req, res, next) => { 
    res.send('<h1>Users</h1>')
})
app.listen(3000)