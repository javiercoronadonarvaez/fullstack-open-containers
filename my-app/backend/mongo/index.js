require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')
const { MONGO_URL } = require('../utils/config')
const { info, errorInfo } = require('../utils/logger')

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => info('Successful connection to MongoDB'))
    .catch(() => errorInfo('Failed to connect with error'))

module.exports = {
  Blog,
  User,
}
