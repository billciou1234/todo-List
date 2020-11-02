const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
let temptime = 0



router.get('/new', (req, res) => {
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)

  temptime = 0

  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name

  const todo = new Todo({ name })

  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)

  temptime = dt
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  if (temptime === 0) {
    console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)
  } else {
    console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl + ' | ues time:' + (dt - temptime) + 'ms')
  }
  temptime = 0
  return Todo.findById(id).lean().then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)

  temptime = 0
  return Todo.findById(id).lean().then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const isDone = req.body.isDone
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)
  temptime = dt

  return Todo.findById(id).then(todo => {
    todo.name = name
    todo.isDone = isDone === 'on'
    // if (isDone === 'on') {
    //   todo.isDone = true
    // } else {
    //   todo.isDone = false
    // }
    return todo.save()
  })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)
  temptime = dt
  return Todo.findById(id).then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
