const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


router.get('/', (req, res) => {
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`

  if (temptime === 0) {
    console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)
  } else {
    console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl + ' | ues time:' + (dt - temptime) + 'ms')
  }


  Todo.find()
    .lean().sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})

module.exports = router