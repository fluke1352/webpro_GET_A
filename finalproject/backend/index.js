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
const register = require('./routes/register')
const login = require('./routes/login')
const home = require('./routes/index')

// const commentRouter = require('./routes/comment')

// app.use(indexRouter.router)
// app.use(blogRouter.router)
app.use(register.router)
app.use(login.router)
app.use(home.router)
// app.use(commentRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})