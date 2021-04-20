const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
// const indexRouter = require('./routes/index')
// const blogRouter = require('./routes/blog')
const product = require('./routes/product')
const register = require('./routes/register')
const login = require('./routes/login')
const inflowhistory = require('./routes/inflowhistory')
const owner = require('./routes/addproduct')
const allproduct = require('./routes/allproduct')
// const editaccount = require('./routes/editaccount')
// const commentRouter = require('./routes/comment')

// app.use(indexRouter.router)
// app.use(blogRouter.router)
app.use(product.router)
app.use(register.router)
app.use(login.router)
app.use(inflowhistory.router)
app.use(owner.router)
app.use(allproduct.router)
// app.use(commentRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})