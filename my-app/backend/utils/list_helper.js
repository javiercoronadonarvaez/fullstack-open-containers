const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce(
    (mostLikesBlog, blog) =>
      blog.likes > mostLikesBlog.likes ? blog : mostLikesBlog,
    blogs[0]
  )

  return blogWithMostLikes
}

const mostBlogs = (blogs) => {
  const listAuthorPublications = blogs.reduce((authorList, blog) => {
    let currentAuthor = authorList.find(
      (authorObject) => authorObject.author === blog.author
    )
    if (currentAuthor) {
      currentAuthor.blogs += 1
    } else {
      authorList.push({ author: blog.author, blogs: 1 })
    }
    return authorList
  }, [])

  const mostBlogsAuthor = listAuthorPublications.reduce(
    (maxBlogsAuthor, authorObject) =>
      authorObject.blogs >= maxBlogsAuthor.blogs
        ? authorObject
        : maxBlogsAuthor,
    listAuthorPublications[0]
  )

  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  const listNumberLikesPerAuthor = blogs.reduce((listLikesPerAuthor, blog) => {
    let currentAuthor = listLikesPerAuthor.find(
      (authorObject) => authorObject.author === blog.author
    )
    if (currentAuthor) {
      currentAuthor.likes += blog.likes
    } else {
      listLikesPerAuthor.push({ author: blog.author, likes: blog.likes })
    }
    return listLikesPerAuthor
  }, [])

  const authorWithMostLikes = listNumberLikesPerAuthor.reduce(
    (mostLikesPerAuthor, authorObject) =>
      authorObject.likes >= mostLikesPerAuthor.likes
        ? authorObject
        : mostLikesPerAuthor,
    listNumberLikesPerAuthor[0]
  )

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
