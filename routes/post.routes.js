const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

/* GET home page */
router.get('/', (req, res) => {
  Post
    .find()
    .then(allPosts => {
      console.log(allPosts);
      res.render('posts/posts.hbs', {posts: allPosts});
    })
    .catch(err => console.log(err));
  
});

/* GET create post page */
router.get('/create', (req, res) => res.render('posts/create-post.hbs'));

/* POST a new post */
router.post('/create', (req, res) => {
  // console.log(req.body);
  Post
    .create(req.body)
    .then(newPost => {
      console.log(newPost);
      res.redirect('/posts');
    })
    .catch(err => console.log(err));  
});

/* POST a new comment */
router.post('/:postId/comment', (req, res) => {
  const { postId } = req.params;
  const { message } = req.body;

  Comment
    .create(message)
    .then(newComment => {
      res.redirect('back');
    })
    .catch(err => console.log(err));
})

module.exports = router;
