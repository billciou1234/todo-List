const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoScheam = new Schema({
  name: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Todo', todoScheam)