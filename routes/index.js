var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var axios = require('axios');


/* GET home page. */
router.get('/', function (req, res, next) {
        
        const sql1 = "SELECT distinct movie_id, movie_name, movie_img, ratio FROM movie WHERE release_date <= current_timestamp() ORDER BY ratio DESC limit 5;";
        const sql2 = "SELECT movie_id, movie_name, movie_img, ratio FROM movie WHERE release_date > current_timestamp() ORDER BY ratio DESC limit 5;";

        const sql3 = "SELECT distinct * FROM movie  WHERE release_date <= current_timestamp() ORDER BY ratio DESC limit 1;"
        console.log(req.cookies)
        console.log(req.signedCookies)
        req.db.getConnection( (connection)=>{
            connection.query(sql1+sql2+sql3, function(error,results,fields){
                
                let screening = [];
                let pre_release = [];
                let movie_selected = results[2][0];
                console.log(movie_selected);

                results[0].forEach((element)=>{
                    screening.push(element);
                });
                results[1].forEach((element)=>{
                    pre_release.push(element);
                })

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



router.post('/',  (req,res) => {

    if(req.session.login.logined== false){
        var username = req.body.username;
        var password = req.body.password;

        var sql = 'SELECT * FROM member WHERE username = ?';

        req.db.getConnection((connection)=>{
            connection.query(sql, [username], async (error, results, fields) => {
                if (results.length == 0) {
                    res.render('login', { alert: true });
                } else {
                    var db_pwd = results[0].password;

                    if (password == db_pwd) {
                        
                        // //session
                        // req.session.login = {
                        //     logined: true,
                        //     username: results[0].username,
                        //     member_id:results[0].member_id
                        // }
                        const token =  await axios.post('http://'+req.headers.host+'/auth/token', {
                            username : username,
                            password :  password
                        });

                        res.cookie('authorization', token.data.token, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly : true,
                            secure : true,
                            sameSite: false, 
                            signed : true
                        })

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