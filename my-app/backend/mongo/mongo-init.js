/* eslint-disable no-undef */
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('blogs')
db.createCollection('users')

// db.blogs.insert({
//   comments: [],
//   title: 'My Second Note',
//   author: 'Javier Coronado',
//   url: 'www.javier-coronado.com',
//   likes: 11,
// })
// db.blogs.insert({
//   comments: [],
//   title: 'The Stoic Manual',
//   author: 'Matti Luukainen',
//   url: 'www.stoicliving.com',
//   likes: 9,
// })
