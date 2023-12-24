const express = require('express');
const Router = express.Router();
const path = require('path');
Router.get('/add-product', (req, res, next) => {
    // console.log("middleware")
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
})
Router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')

})
module.exports=Router