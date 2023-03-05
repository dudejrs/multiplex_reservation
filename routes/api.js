var express = require('express');
var mysql = require('mysql');
var router = express.Router();



router.get('/movie',function(req,res){
    const movie_id = req.query.movie_id;
    const sql = "SELECT * FROM movie WHERE movie_id = ?;";

    req.db.getConnection((connection)=>{
        connection.query(sql,[movie_id],(error,results,fileds)=>{

            results[0].type = "movie_selected";
            res.json(results[0]) ;
        });
    })
});

router.get('/reserv',function(req,res,next){
    const sql = "SELECT reservation_id, movie_img, movie_name, cinema_name, screen_no, box_office.date,start_time,running_time, amount from reservation natural join box_office natural join movie natural join cinema natural join screen natural join payment WHERE member_id = (SELECT member_id FROM member WHERE username = ?) and reservatioN_status = 'R' ;";
    req.db.getConnection((connection)=>{
        connection.query(sql,[req.session.login.username],function(err,results,fields){
            res.json({
                type : "reservation_list",
                results
            });
        });
    });
})

router.get('/cinema/:cinema_id', function(req,res){

    if(req.query.movielist != undefined ) {
        const sql = "SELECT distinct movie.movie_name, movie.movie_id, movie.movie_img FROM box_office join screen join movie  WHERE box_office.screen_id = screen.screen_id and box_office.movie_id = movie.movie_id and cinema_id = ? ;"
        req.db.getConnection((connection)=>{
            connection.query(sql,[req.params.cinema_id], function(err, results, fields){
                
                res.json({
                    type: "movie_id",
                    results
                });
            });
        });
    }

    if(req.query.movieid && (req.query.datelist != undefined)){
        const sql = "SELECT distinct box_office.date FROM box_office join screen join movie WHERE box_office.movie_id = movie.movie_id and box_office.screen_id = screen.screen_id and screen.cinema_id = ? and movie.movie_id = ?";
        
        req.db.getConnection((connection)=>{
            connection.query(sql, [req.params.cinema_id, req.query.movieid], function(err,results, fields){
                res.json({
                    type : "date_list",
                    results
                });
            });
        });
    }

    if(req.query.movieid && (req.query.screenlist != undefined)){
        const sql = "SELECT box_office.box_office_id, box_office.screen_id, screen.screen_no, box_office.start_time FROM box_office join screen join movie WHERE box_office.movie_id = movie.movie_id and box_office.screen_id = screen.screen_id and screen.cinema_id = ? and movie.movie_id = ? and date = ?;"
        req.db.getConnection((connection)=>{
            connection.query(sql, [req.params.cinema_id, req.query.movieid, req.query.date], function(err,results,fields){
                console.log(err);
                res.json({
                    type : "screen_list",
                    results
                })
            });
        });
    } 

});

router.get('/cinema', function(req,res){
    if(req.query.list != undefined){
        const sql = "SELECT distinct region FROM cinema";
        req.db.getConnection((connection)=>{
            connection.query(sql,[], function(err, results, fields){
                results = results.map(r=>r['region'].trim())
                res.json({
                    type : "cinema_region_list",
                    results
                });
            });
        });
        return;
    }

    if(req.query.region){
        const sql = `SELECT distinct cinema_name, cinema_id FROM cinema WHERE region like ?`;
        const param = "%" + req.query.region.trim() + "%"
        req.db.getConnection((connection)=>{
            connection.query(sql,[param], function(err,results,fields){
                res.json({
                    type : "cinema_list",
                    results
                });
            });
        });
        return;
    }

    res.end();
});



router.delete('/reserv', function(req,res,next){
    const reservation_id = req.body.reservation_id;
    if(reservation_id){  
        const sql = `UPDATE \`cenema\`.\`reservation\` SET \`reservation_status\` = 'C' WHERE (\`reservation_id\` = \'${reservation_id}\');`
        req.db.getConnection((connection)=>{

            connection.query(sql,function(err,results,fields){
                if(err){
                    res.json({
                        type : "reservation_cancel"
                    });
                }
                else {
                    res.json({
                        type : "reservation_cancel",
                        reservation_id : reservation_id
                    });
                }
            });
        });
    }

});

router.get('/coupon',function(req,res,next){
    const sql = `SELECT * FROM member WHERE member_id= ${login.member_id};`;
    req.db.getConnection((connection)=>{    
        connection.query(sql,function(err,results,fields){
            console.log(results);
            if(!results || results.length == 0) {
                res.json({
                    type : "cuppon",
                    count : "0"
                });
            }
            else{
                let sql_default = "SELECT * FROM coupon WHERE coupon_id ="
                let sql_result=""
                const cuppon_list = results[0].coupon_able.split(',');
                for(i=0; i<cuppon_list.length;i++){
                        let item = parseInt(cuppon_list[i]);
                        sql_result += sql_default+item+";";
                }
                    

                console.log(sql_result);

                connection.query(sql_result,function(err,results,fields){
                    console.log(results);
                    res.json({
                        type: "coupon",
                        count: 0,
                        coupon_list : results
                    });
                })
            }
        })
    });
});

router.post('/find',function(req,res,next){
    const type_category = ["id","pw","pw_reinput"];
    const type = req.query.query;
    let sql = "";
    
    if(!type || !type_category.includes(type)) {
        res.redirect('/login');
    }else if(type == "id"){
        sql="SELECT member_id, username FROM member WHERE ";
        if (req.body.id_method == "email" && req.body.email){ 
            sql += `email_address =\"${req.body.email}\"`;
        }else if(req.body.id_method == "phone_number" && req.body.phone_number){
            sql += `phone_number =\"${req.body.phone_number}\"`
        } else {
            sql = "";
            res.redirect('/login/find?query=id&err=true')
        }
    }else if(type == "pw"){
        sql="SELECT member_id, username FROM member WHERE ";
        if (req.body.pw_method == "email" && req.body.email){ 
            sql += `email_address =\"${req.body.email}\"`;
        }else if(req.body.pw_method == "phone_number" && req.body.phone_number){
            sql += `phone_number =\"${req.body.phone_number}\"`
        } else {
            sql=""
            res.redirect('/login/find?query=pw&err=true');
        }
    }else{
        if(req.body.password != req.body.password_check || !req.body.pasword){
            res.redirect('/login/find?query=pw&err=true');
        }else{
            console.log(req.body.password);
            sql = `UPDATE \`cenema\`.\`member\` SET \`password\` = \'${req.body.password}\' WHERE (\`member_id\` = \'${req.body.member_id}\')`;
        }
    }

   if(sql != ""){
        req.db.getConnection((connection)=>{
            connection.query(sql,function(err,results,fileds){
                if(err || !results[0]){
                    res.redirect('/login/find?query='+type+"&err=true");
                }
                res.render('account_finder',{
                    type : "result",
                    query : type,
                    result : results
                });
            });
        });
   }


});

module.exports = router;