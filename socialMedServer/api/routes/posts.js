const express = require('express');
const router = express.Router();
const Post = require ('../models/post');
const mongoose = require('mongoose');
var jwtUtils  = require('../utils/jwt.utils');

router.get("/", (req, res, next) => {
    Post.find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.get("/me", (req, res, next) => {

  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);
  console.log(userId);
  Post.find({
    authorId : userId
  }).sort({date : -1})
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/all", (req, res, next) => {

  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);
  console.log(userId);
  Post.find({
    authorId : {$ne : userId}
  }).sort({date : -1})
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);

  if(userId < 0){
    res.status(400).json({ 'error': 'wrong token' });
  }
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        authorId: userId, 
        msg: req.body.msg,
        picUrl : req.body.picUrl,
        date : req.body.date
    });
    post.save().then( result =>{
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /posts',
            createdPost : post
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err =>{
            error : err
        });
    });
});

router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
    .exec()
    .then(doc =>{
        console.log("From Db",doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : "No post found "});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err : err});
    });
});

router.patch("/:postId", (req, res, next) => {
  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);

  if(userId < 0){
    res.status(400).json({ 'error': 'wrong token' });
  }
    const id = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Post.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.delete("/:postId", (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    if(userId < 0){
      res.status(400).json({ 'error': 'wrong token' });
    }

    const id = req.params.postId;
    Post.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;