const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize()) //passport 初始化
  app.use(passport.session())  // session交給app使用


  //設定LocalStrategy，透過mongodb去驗證登入資料
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email. is not registered' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Passwprd incorrect' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))


  //session的部分，序列化
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
  })

  //反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}