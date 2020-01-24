const App = require('./data.js')

exports.getUserById = (id, cb) => {
  // simulate API call
  window.setTimeout(() => {
    const user = App.users.find(user => user.id === id)
    cb(user)
  }, 150)
}

exports.getPostsForUser = (userId, cb) => {
  // simulate API call
  window.setTimeout(() => {
    const posts = App.posts.filter(post => post.createdBy === userId)
    cb(posts)
  }, 150)
}
