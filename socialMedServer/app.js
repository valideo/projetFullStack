const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');


const postsRoutes = require('./api/routes/posts');
const usersRoutes = require('./api/routes/users');

mongoose.connect('mongodb+srv://valideo:val2407entin@cluster0-vwrog.mongodb.net/test?retryWrites=true',{
    useNewUrlParser : true
});

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET, PUT');
        return res.status(200).json({}); 
    }
    next();
});

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use('/posts', postsRoutes);
app.use('/user', usersRoutes);

module.exports = app;