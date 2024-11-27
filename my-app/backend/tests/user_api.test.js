const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    await api.post('/api/users').send(user)
  }
})

describe('User HTTP Testing', () => {
  test('Invalid user with username with fewer than 3 characters does not get created', async () => {
    const invalidUser = {
      username: 'as',
      user: 'Matti Lukkainen',
      password: 'salainen',
    }

    const user = await api.post('/api/users').send(invalidUser).expect(400)
    const currentUsers = await helper.usersInDb()

    assert.strictEqual(user.res.statusMessage, 'Bad Request')
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
  })

  test('Invalid user with password with fewer than 3 characters does not get created', async () => {
    const invalidUser = {
      username: 'Cartman',
      user: 'Matti Lukkas',
      password: 'as',
    }

    const user = await api.post('/api/users').send(invalidUser).expect(400)
    const currentUsers = await helper.usersInDb()

    assert.strictEqual(user.res.statusMessage, 'Bad Request')
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
  })

  test('Invalid user with non unique username does not get created', async () => {
    const invalidUser = {
      username: 'mluukkai',
      user: 'Matti Lukkas',
      password: 'testing',
    }

    const user = await api.post('/api/users').send(invalidUser).expect(400)
    const currentUsers = await helper.usersInDb()

    assert.strictEqual(user.res.statusMessage, 'Bad Request')
    assert.strictEqual(currentUsers.length, helper.initialUsers.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
