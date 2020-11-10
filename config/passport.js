const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

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
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or Passwprd incorrect' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email: email })
      .then(user => {
        if (user) return done(null, user)
        //隨機0~1小數，36為a~z以及0~9，取最後八位
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrybt
          .genSalt(10)
          .then(salt => bcrybt.hash(password, salt))
          .then(hash => User.create({
            name: name,
            email: email,
            password: hash
          }))
          .then(user => done(nell, user))
          .catch(err => done(err, false))

      })
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