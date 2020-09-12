// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const exphbs = require('express-handlebars')

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



// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.error(error))


})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})