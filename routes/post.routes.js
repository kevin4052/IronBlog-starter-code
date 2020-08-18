const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');

/* GET home page */
router.get('/posts', (req, res) => {
  Post
    .find()
    .then(allPosts => {
      console.log(allPosts);
      res.render('posts/posts.hbs', {posts: allPosts});
    })
    .catch(err => console.log(err));
  
});

router.get('/post-create', (req, res) => res.render('posts/create-post.hbs'));


router.post('/post-create', (req, res) => {
  // console.log(req.body);
  Post
    .create(req.body)
    .then(newPost => {
      console.log(newPost);
      res.redirect('/posts');
    })
    .catch(err => console.log(err));  
});

module.exports = router;
