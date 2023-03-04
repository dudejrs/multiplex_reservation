var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var login = {
    logined : false,
    username : "",
    member_id : -1
}


router.get('/',function(req,res,next){
    res.render('payment',{
        logined : login.logined,
        username : login.username
    });
});


module.exports = router;