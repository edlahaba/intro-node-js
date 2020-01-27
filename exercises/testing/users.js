const users = new Array(20).fill(0)
.map((_, i) => {
  return {
    id: i,
    createdAt: Date.now() + i,
    email: `readycoder${i}@gmail.com`
  }
})

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
  const user = users.find(user => {return user.id == id;})

  if (user) {
    return resolve(user)
  }
  reject(new Error(`No user with id "${id}"`))
})

// simulate async db call with promise
const deleteUser = (id) => new Promise((resolve, reject) => {
  const i = parseInt(users.findIndex(user => {return user.id == id;}));

  if (i < 0) {
    return reject(new Error(`No user with id "${id}"`))
  }

  users.slice(i, 1);
  return resolve({id: parseInt(id)});
})

module.exports = {
  findUser,
  deleteUser
}
