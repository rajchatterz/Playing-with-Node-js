const express = require('express');
const Router = express.Router();

Router.get('/add-product', (req, res, next) => {
    // console.log("middleware")
    res.send('<form method="POST" action="/admin/product"><input type="text" name="text"/><button type="submit">Add product</button></form>')
})
Router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')

})
module.exports=Router