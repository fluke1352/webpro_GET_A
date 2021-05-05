const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const register = require('./routes/register')
const login = require('./routes/login')
const inflowhistory = require('./routes/inflowhistory')
const owner = require('./routes/addproduct')
const allproduct = require('./routes/allproduct')
const editproduct = require('./routes/editproduct')
const orderhistory = require('./routes/orderhistory')
const productdetial = require('./routes/productdetail')
const usercart = require('./routes/usercart')
const alluser = require('./routes/alluser')
const allorder = require('./routes/allorder')

app.use(register.router)
app.use(login.router)
app.use(inflowhistory.router)
app.use(owner.router)
app.use(allproduct.router)
app.use(editproduct.router)
app.use(orderhistory.router)
app.use(productdetial.router)
app.use(usercart.router)
app.use(alluser.router)
app.use(allorder.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})