var express = require('express');
var router = express.Router();



router.get('/',function(req,res,next){
    if(req.session.login.logined){
        res.redirect('/');
    }
	res.render('login',{
		logined : req.session.login.logined,
		username : req.session.login.username
	});
});

router.get('/register',function(req,res,next){
    if(req.session.login.logined){
        res.redirect('/');
    }
	res.render('register',{
		logined : req.session.login.logined,
		username : req.session.login.username
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