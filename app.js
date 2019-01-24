require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const indexRouter = require('./routes/index')
const app = express()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST", "GET")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(passport.initialize())

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth",
  userAgent: process.env.DOMAIN
},
function(accessToken, refreshToken, profile, cb) {
  console.log(accessToken);

}
))

app.get('/login',
  passport.authenticate('github'))

app.get('/auth',
  passport.authenticate('github', { successRedirect: 'http://localhost:3000', failureRedirect: '/'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/', indexRouter)

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})

module.exports = app
