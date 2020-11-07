const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoScheam = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }

})

module.exports = mongoose.model('Todo', todoScheam)