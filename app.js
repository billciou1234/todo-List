// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')

const routes = require('./routes')
const router = require('./routes')
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
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))




// 設定首頁路由
app.ues(routes)






// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})