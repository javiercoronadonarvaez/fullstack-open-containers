// require('dotenv').config()

const PORT = process.env.PORT

// const MONGODB_URI =
//   process.env.NODE_ENV !== 'test'
//     ? process.env.MONGODB_URI
//     : process.env.TEST_MONGODB_URI

// module.exports = {
//   MONGODB_URI,
//   PORT,
// }

const MONGO_URL = process.env.MONGO_URL || undefined

console.log('MONGO_URL', MONGO_URL)

module.exports = {
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  PORT,
}
