const express = require('express');
const router = express.Router();
const Post = require ('../models/post');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check_auth');

router.get("/", (req, res, next) => {
    Post.find()
      .exec()
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post('/', checkAuth, (req, res, next) => {
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        authorId: req.body.authorId, 
        msg: req.body.msg 
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

router.patch("/:postId", checkAuth, (req, res, next) => {
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
  
  router.delete("/:postId", checkAuth, (req, res, next) => {
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