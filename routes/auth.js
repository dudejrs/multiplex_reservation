var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');


router.post('/token', async(req,res)=>{
    const {clientSecret} = req.body;

    try{
        

    }catch(error){
        return res.status(500).json({
            code : 500,
            message : '서버 에러'
        });
    }

});



module.exports = router;