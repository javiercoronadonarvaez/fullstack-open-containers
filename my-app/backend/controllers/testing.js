const router = require('express').Router()
const { Blog } = require('../mongo')
const { User } = require('../mongo')
// const Blog = require('../mongo/models/blog')
// const User = require('../mongo/models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
