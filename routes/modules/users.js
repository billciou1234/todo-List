const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // const name = req.body.name
  // const email = req.body.email
  // const password = req.body.password
  // const confirmPassword = req.body.confirmPassword
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      req.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      //同樣功能，較簡短
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      // const newUser = new User({
      //   name,
      //   email,
      //   password
      // })
      // newUser.save().then(() => res.render('/')).catch(err => console.log(err))


    }
  })
})


module.exports = router