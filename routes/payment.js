var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/',function(req,res,next){
    res.render('payment',{
        logined : req.session.login.logined,
        username : req.session.login.username
    });
});

router.post('/',function(req,res,next){
    res.render('payment',{
        logined : req.session.login.logined,
        username : req.session.login.username
    });
});


module.exports = router;