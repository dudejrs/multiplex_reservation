var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

var LoginRotuer= require("./login");
var ReserveRouter= require("./reserve");
var ApiRouter = require("./api");
var UserRouter = require("./users");


var login = {
    logined : false,
    username : "",
    member_id : -1
}


var connection = mysql.createConnection({
    multipleStatements: true,
    host: '127.0.0.1',
    user: 'userA',
    post: 3306,
    password: 'secret',
    database: 'multiplex_reservation',
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Success DB connection');
});


//session
router.use(session({
    secret: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


router.use(function(req,res,next){
    if (req.session.user) {
    	login.logined = req.session.user.logined;
    	login.username = req.session.user.username;
        login.member_id = req.session.user.member_id;
    }
	next();	
});


router.use("/login", LoginRotuer);
router.use("/reserv", ReserveRouter);
router.use("/api", ApiRouter);
router.use("/register", UserRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
        const sql1 = "SELECT distinct movie_id, movie_name, movie_img, ratio FROM movie WHERE release_date <= current_timestamp() ORDER BY ratio DESC limit 5;";
        const sql2 = "SELECT movie_id, movie_name, movie_img, ratio FROM movie WHERE release_date > current_timestamp() ORDER BY ratio limit 5;";

        const sql3 = "SELECT distinct * FROM movie  WHERE release_date <= current_timestamp() ORDER BY ratio limit 1;"


        connection.query(sql1+sql2+sql3, function(error,results,fields){
            console.log(error);
            console.log(results);
            let screening = [];
            let pre_release = [];
            let movie_selected = results[2][0];

            results[0].forEach((element)=>{
                screening.push(element);
            });
            results[1].forEach((element)=>{
                pre_release.push(element);
            })

        res.render('index.ejs', {
            logined: login.logined,
            username: login.username,
            movie : [ 
                screening,pre_release
            ],
            movie_selected : movie_selected
        });
    });

    // const screening = [];
    // const pre_release = [];
    // const movie_selected = [];

    // res.render('index.ejs', {
    //     logined: login.logined,
    //     username: login.username,
    //     movie : [ 
    //         screening, pre_release
    //     ],
    //     movie_selected : movie_selected
    // });
});


router.get('/payment',function(req,res,next){
    res.render('payment',{
        logined : login.logined,
        username : login.username
    });
});



router.post('/', function(req, res){
    console.log(login.logined);  
    if(login.logined== false){
        var username = req.body.username;
        var password = req.body.password;

        var sql = 'SELECT * FROM member WHERE username = ?';
        connection.query(sql, [username], function (error, results, fields) {
            if (results.length == 0) {
                res.render('login', { alert: true });
            } else {
                var db_pwd = results[0].password;

                if (password == db_pwd) {
                    //session
                    req.session.user = {
                        logined: true,
                        username: results[0].username,
                        member_id:results[0].member_id
                    }
                }
                    res.redirect('/');
            }
        });
    }else {

        req.session.user = {
            logined : false,
            username : "",
            member_id : -1
        }

        res.json({
            type: "logout"
        })
    }
});





module.exports = router;