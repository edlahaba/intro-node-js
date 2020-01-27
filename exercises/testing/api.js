const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const users = require('./users')
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/user/:id', async (req, res) => {
  await users.findUser(req.params.id).then(user => {
    res.status(200).send(user);
  }).catch(() => {
    res.status(422).send();
  });
})

app.delete('/user/:id', async (req, res) => {
  await users.deleteUser(req.params.id).then(id => {
    res.status(201).send(id)
  }).catch(() => {
    res.status(422).send();
  })
})

module.exports = app
