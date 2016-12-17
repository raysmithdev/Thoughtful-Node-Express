const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./models/post')
const { u, p} =  require('./config')

const port = 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbUrl = `mongodb://${u}:${p}@ds041934.mlab.com:41934/thoughtful`

mongoose.connect(dbUrl)

app.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if(err) {
      res.send(err)
    }

    res.json(posts)
  })
})

app.post('/create-post', (req, res) => {
  let post = new Post()

  post.from = req.body.from
  post.title = req.body.title
  post.body = req.body.body
  post.createdAt = Date.now()

  post.save((err, post) => {
    if(err) {
      res.send(err)
    }

    Post.find({}, (err, posts) => {
      if(err) {
        res.send(err)
      }

      res.json(posts)
    })
  })
})

app.listen(port, () => console.log('Server is good to go!'))
