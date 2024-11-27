const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
    comments: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!request.decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  console.log('SAVED BLOG', savedBlog)
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  const createdBlog = await Blog.findById(savedBlog.toJSON().id).populate(
    'user',
    {
      username: 1,
      name: 1,
      id: 1,
    }
  )
  response.status(201).json(createdBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comments = request.body.comments
  console.log('COMMENT', comments)
  const blog = await Blog.findById(request.params.id)
  blog.comments = comments
  console.log('Retrieved Blog:', blog)
  await blog.save()
  response.status(201).json(blog.toJSON())
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    if (!request.decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      console.log('Deleted Blog Backend: ', blog)
      response.json(blog)
    } else {
      return response
        .status(401)
        .json({ error: 'Token does not correspond to Blog author' })
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  if (!request.decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const { title, author, url, likes } = request.body

  await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  const updatedBlogAllData = await Blog.findById(request.params.id).populate(
    'user',
    {
      username: 1,
      name: 1,
      id: 1,
    }
  )
  response.json(updatedBlogAllData)
})

module.exports = blogsRouter
