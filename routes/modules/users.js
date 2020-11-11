const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrybt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // const name = req.body.name
  // const email = req.body.email
  // const password = req.body.password
  // const confirmPassword = req.body.confirmPassword
  const errors = []
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return req.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrybt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then(salt => bcrybt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then(hash => User.create({
        name,
        email,
        password: hash // 用雜湊值取得原本的使用者密碼
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    // const newUser = new User({
    //   name,
    //   email,
    //   password
    // })
    // newUser.save().then(() => res.render('/')).catch(err => console.log(err))



  })
})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出!')
  res.redirect('/users/login')
})


module.exports = router