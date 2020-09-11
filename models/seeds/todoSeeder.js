const mongoose = require('mongoose')
const db = mongoose.connection
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })


db.on('error', () => {
  console.log('mongdb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done.')
})