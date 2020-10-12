const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
let temptime = 0


router.get('/', (req, res) => {
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`

  if (temptime === 0) {
    console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)
  } else {
    console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl + ' | ues time:' + (dt - temptime) + 'ms')
  }

  temptime = 0
  Todo.find()
    .lean().sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})



router.get('/todos/new', (req, res) => {
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)

  temptime = 0

  return res.render('new')
})

router.post('/todos', (req, res) => {
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

router.get('/todos/:id', (req, res) => {
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

router.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  let dt = new Date
  let DateTime = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  console.log(DateTime + ' | ' + req.method + ' from ' + req.originalUrl)

  temptime = 0
  return Todo.findById(id).lean().then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

router.put('/todos/:id', (req, res) => {
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

router.delete('/todos/:id', (req, res) => {
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
