const express = require('express');
const router = express.Router();
const routeGuard = require('../configs/route-guard.config');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

/* GET home page */
router.get('/', (req, res) => {
  Post
    .find()
    .populate("user comments")
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
  const { title, message } = req.body;

  const postData = {
    title,
    message,
    user: req.session.loggedInUser._id
  };

  console.log({postData});

  Post
    .create(postData)
    .then(newPost => {
      console.log(newPost);
      res.redirect('/posts');
    })
    .catch(err => console.log(err));  
});

/* POST a new comment */
router.post('/:postId/comment', (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;

  // console.log({postId});

  const submittedComment = {
    message: comment,
    post: postId,
    user: req.session.loggedInUser._id
  };

  Comment
    .create(submittedComment)
    .then(newComment => {

      console.log({newComment});
      console.log({user: req.session.loggedInUser});

      Post
        .findById(postId)
        .then(async postFromDB => {

          postFromDB.comments.push(newComment._id);
          await postFromDB.save();

          console.log({postFromDB});
          res.redirect('back');

        })
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
});

module.exports = router;
