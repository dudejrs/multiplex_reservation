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
    
    var cost = 1000;
    // cost 로직

    // session에 등록
    req.session.reservation = {
        box_office_id : req.body.box_office_id,
        movie_id : req.body.movie_id, 
        date : req.body.date,
        seat : req.body.info_s
    } 

    req.session.save((err)=>{
            if(err) next(err);
            console.log(req.session);
            console.log(req.sessionID)
            res.render('payment',{
                logined : req.session.login.logined,
                username : req.session.login.username,
                info_s : req.body.info_s,
                screen : req.body.screen_no,
                date : req.body.date,
                movie_name : req.body.movie_name,
                cinema_name : req.body.cinema_name,
                cost : cost
            });
        }
    );


});


router.post('/checkout', function(req,res,next){
    const sql = "INSERT INTO reservation(box_office_id, member_id, reservation_status, person_type, seat_type) VALUES(?,?,?,?,?);";


    let box_office_id = req.session.reservation.box_office_id;
    let seat =  req.session.reservation.seat;


    req.db.getConnection((connection)=>{

        connection.query(sql, [ 
                box_office_id,
                req.session.login.member_id,
                'reserved',
                'adult',
                seat], function(err, result, fields){
            if(err) console.log(err);
            return res.redirect("/");        
        });

    });

    return ;
});

module.exports = router;