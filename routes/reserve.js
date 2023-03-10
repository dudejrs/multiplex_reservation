var express = require('express');
var router = express.Router();

var login = {
    logined : false,
    username : "",
    member_id : -1
}


router.get("/", function(req,res,next){
    var state = req.url;
    var statesplit = state.split('_');
    var results_region ;
    var results_cinema;
    var results_movie;
    var results_date;
    var results_screen;
    var region = "서울";
    var cinema_name;
    var movie_name;
    
     res.render('reservation', {
        logined: req.session.login.logined,
        username: req.session.login.username,
        reservation_information: [region, "", "", "", "", "", ""],
        results_region,
        results_cinema,
        results_movie,
        results_date,
        results_screen: null,
        state
    });
})



module.exports = router;