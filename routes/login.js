var express = require('express');
var router = express.Router();

var login = {
    logined : false,
    username : "",
    member_id : -1
}


router.get('/',function(req,res,next){
    if(login.logined){
        res.redirect('/');
    }
	res.render('login',{
		logined : login.logined,
		username : login.username
	});
});

router.get('/register',function(req,res,next){
    if(login.logined){
        res.redirect('/');
    }
	res.render('register',{
		logined : login.logined,
		username : login.username
	});
});

router.get('/find',function(req,res,next){
    const type_category = ["id","pw","pw_reinput"];
    const type = req.query.query;
    const err = req.query.error;
    if(login.logined || !type_category.includes(type)){
        res.redirect('/');
    } 
    console.log(err);
    res.render("account_finder",{
        type : type,
        err : err
    });
});


module.exports = router;