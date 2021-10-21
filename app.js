const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const session = require('express-session')

//middleware part!
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24
  },
  resave: false
}))
app.use('/', routes)

app.listen(port, () => console.log('Running on port', 3000))