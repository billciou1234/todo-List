// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongdb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))


// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find()
    .lean().sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  const todo = new Todo({ name })
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('edit', { todo: todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const isDone = req.body.isDone
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

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})