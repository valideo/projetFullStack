const express = require('express');
var router = express.Router();

//UploadImg
var multer  = require('multer');

var storagePost = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/posts');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = 'jpg';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var uploadpost = multer({storage: storagePost});
var uploadPostFinal = uploadpost.single('file');
router.post('/posts',function(req, res) {
    uploadPostFinal(req, res, function (err){
      if(!req.file){
        res.status(500);
        console.log(err);
      }
      if(err)
        console.log(err);

      res.json(req.file.filename);
    })
});

var storageProfile  = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/profiles');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = 'jpg';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var uploadprofile = multer({storage: storageProfile});
var uploadProfileFinal = uploadprofile.single('file');
router.post('/profiles',function(req, res) {
    uploadProfileFinal(req, res, function (err){
      if(!req.file){
        res.status(500);
        console.log(err);
      }
      if(err)
        console.log(err);

      res.json(req.file.filename);
    })
});


module.exports = router;