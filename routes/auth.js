var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
const jwt = require('jsonwebtoken');


router.post('/token', async (req,res)=>{
    const {username, password} = req.body;

    try{
        const sql = "SELECT member_id FROM member WHERE username= ? and password = ?"
        req.db.getConnection((connection)=>{
            connection.query(sql, [req.body.username, req.body.password],function(err, results, fields){
                if(err){
                    return res.status(401).end();
                }
                const token = jwt.sign({
                    member_id : results[0]["member_id"],
                    username : req.body.username
                }, process.env.JWT_SECRET, {
                    expiresIn : '1h'
                });

                return res.json({
                    code: 200,
                    token
                });
            });

        });


    }catch(error){
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    }

});



module.exports = router;