var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function (req, res, next) {
        const sql1 = "SELECT distinct movie_id, movie_name, movie_img, ratio FROM movie WHERE release_date <= current_timestamp() ORDER BY ratio DESC limit 5;";
        const sql2 = "SELECT movie_id, movie_name, movie_img, ratio FROM movie WHERE release_date > current_timestamp() ORDER BY ratio DESC limit 5;";

        const sql3 = "SELECT distinct * FROM movie  WHERE release_date <= current_timestamp() ORDER BY ratio limit 1;"

        req.db.getConnection( (connection)=>{
            connection.query(sql1+sql2+sql3, function(error,results,fields){
                
                let screening = [];
                let pre_release = [];
                let movie_selected = results[2][0];

                results[0].forEach((element)=>{
                    screening.push(element);
                });
                results[1].forEach((element)=>{
                    pre_release.push(element);
                })
                console.log(req.session)

                res.render('index.ejs', {
                    logined: req.session.login.logined,
                    username: req.session.login.username,
                    movie : [ 
                        screening,pre_release
                    ],
                    movie_selected : movie_selected
                });
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



router.post('/', function(req, res){
    console.log(login.logined);  
    if(req.session.login.logined== false){
        var username = req.body.username;
        var password = req.body.password;

        var sql = 'SELECT * FROM member WHERE username = ?';

        req.db.getConnection((connection)=>{
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
        })

    }else {

        req.session.login.logined= {
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