const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
// const User = require('../mongo/models/user')
const { User } = require('../mongo')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  console.log('Parameters', request.params.id)
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  console.log('Retrieved User', user)
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password should be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser.toJSON())
})

module.exports = usersRouter
