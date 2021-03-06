var express = require('express');
var router = express.Router();
var User = require('../models/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, all_users) {
      if(err){
        res.json({success: false, err:"unable to read users "});
      } else {
        res.json({success: true, result: all_users});
      }
  });
});




/* GET users Details. */
router.get('/details/:id', function(req, res, next) {
    User.findOne({}, function (err, user) {
        if(err){
            res.json({success: false, err:"unable to read user "});
        } else {
            res.json({success: true, result: user});
        }
    });
});


/* POST users listing. */
router.post('/insert', function (req, res, next) {
    if (req.body.name === undefined || req.body.name === "") {
        return res.json({success: false, err: "name is missing"});
    }
    if (req.body.email === undefined || req.body.email === "") {
        return res.json({success: false, err: "email is missing"});
    }

    if (req.body.password === undefined || req.body.password === "") {
        return res.json({success: false, err: "password is missing"});
    }
    var newUser = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };


    User.create(newUser, function (err, created_user) {
        if (err) {
            res.json({success: false, err: "unable to create user "});
        } else {
            res.json({success: true, result: created_user});
        }
    });
});
/* delete users listing. */
router.delete('/delete', function(req, res) {
    User.remove({_id: req.body.id}, function (err, user) {
        if(err){
            res.json({success: false, err:"unable to read user "});
        } else {
            res.json({success: true, result: ""});
        }
    });
});


/* PUT users listing. */
router.put('/update', function (req, res) {
    if (req.body.id === undefined || req.body.id === "") {
        return res.json({success: false, err: "id is missing"});
    }
    if (req.body.name === undefined || req.body.name === "") {
        return res.json({success: false, err: "name is missing"});
    }
    if (req.body.email === undefined || req.body.email === "") {
        return res.json({success: false, err: "email is missing"});
    }

    if (req.body.password === undefined || req.body.password === "") {
        return res.json({success: false, err: "password is missing"});
    }


    var updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };


    User.findOneAndUpdate({_id: req.body.id}, updatedUser, {new: true}, function (err, user) {
        if (err) {
            res.json({success: false, err: "unable to update user "});
        } else {
            res.json({success: true, result: user});
        }
    });
});


module.exports = router;
