const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwtUtils  = require('../utils/jwt.utils');


const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              pseudo: req.body.pseudo,
              fName: req.body.fName,
              lName: req.body.lName
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwtUtils.generateTokenForUser(user[0]);
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
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
    User.find({
      _id : userId
    })
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

  router.get("/find/:id", (req, res, next) => {

    var idUser = req.params.id;
    User.findOne({
      _id : idUser
    })
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

  router.get("/:searchString", (req, res, next) => {

    var searchQuery = req.params.searchString;
    console.log(searchQuery);
    User.find({ $or: [ {fName : {$regex: searchQuery, $options : 'i'}}, {lName : {$regex: searchQuery, $options : 'i'}}, {pseudo : {$regex: searchQuery, $options : 'i'}}]}).limit(5)
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

  router.put("/me", (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);
    console.log(userId);
    User.findByIdAndUpdate({_id : userId}, req.body)
      .exec()
      .then(docs => {
        User.findOne({_id : userId})
        .exec()
        .then(userUpdated =>{
          res.status(200).json(userUpdated);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.put("/addFriend", (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);
    console.log(userId);
    User.updateOne({_id : userId}, { $addToSet: { friendsList: req.body.friends } })
      .exec()
      .then(docs => {
        User.findOne({_id : userId})
        .exec()
        .then(userUpdated =>{
          User.updateOne({_id : req.body.friends}, { $addToSet: { friendsList: userId } })
          .exec()
          .then(docs => {
            User.findOne({_id : userId})
            .exec()
            .then(userUpdated =>{
              User.updateOne({_id : userId}, { $pull: { friendsRequestsReceived: req.body.friends } })
              .exec()
              .then(docs => {
                User.findOne({_id : userId})
                .exec()
                .then(userUpdated =>{
                  User.updateOne({_id : req.body.friends}, { $pull: { friendsRequestsSent: userId } })
                  .exec()
                  .then(docs => {
                    User.findOne({_id : userId})
                    .exec()
                    .then(userUpdated =>{
                      res.status(200).json(userUpdated);
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err
                      });
                    })
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.put("/requestFriend", (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);
    console.log(userId);
    User.updateOne({_id : userId}, { $addToSet: { friendsRequestsSent: req.body.friends } })
      .exec()
      .then(docs => {
        User.findOne({_id : userId})
        .exec()
        .then(userUpdated =>{
          res.status(200).json(userUpdated);
          User.updateOne({_id : req.body.friends}, { $addToSet: { friendsRequestsReceived: userId } })
          .exec()
          .then(docs => {
            User.findOne({_id : userId})
            .exec()
            .then(userUpdated =>{
              res.status(200).json(userUpdated);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.put("/removeFriend", (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);
    console.log(userId);
    User.updateOne({_id : userId}, { $pull: { friendsList: req.body.friends } })
      .exec()
      .then(docs => {
        User.findOne({_id : userId})
        .exec()
        .then(userUpdated =>{
          res.status(200).json(userUpdated);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.put("/removeRequestFriend", (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);
    console.log(userId);
    User.updateOne({_id : userId}, { $pull: { friendsRequestsReceived: req.body.friends } })
      .exec()
      .then(docs => {
        User.findOne({_id : userId})
        .exec()
        .then(userUpdated =>{
          res.status(200).json(userUpdated);
          User.updateOne({_id : req.body.friends}, { $pull: { friendsRequestsSent: userId } })
          .exec()
          .then(docs => {
            User.findOne({_id : userId})
            .exec()
            .then(userUpdated =>{
              res.status(200).json(userUpdated);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;