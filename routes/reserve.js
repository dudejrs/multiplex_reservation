var express = require('express');
var router = express.Router();

var login = {
    logined : false,
    username : "",
    member_id : -1
}



router.get('/:state', function (req, res, next) {
    var state = req.url;
    var statesplit = state.split('_');
    var results_region;
    var results_cinema;
    var results_movie;
    var results_date;
    var results_screen;
    var region = "서울";
    var cinema_name;
    var movie_name;
    
     res.render('reservation', {
        logined: login.logined,
        username: login.username,
        reservation_information: [region, "", "", "", "", "", ""],
        results_region,
        results_cinema,
        results_movie,
        results_date,
        results_screen: null,
        state
    });
});
// router.get('/reserv/:state', function (req, res, next) {
//     var state = req.url;
//     var statesplit = state.split('_');
//     var results_region;
//     var results_cinema;
//     var results_movie;
//     var results_date;
//     var results_screen;
//     var region = "서울";
//     var cinema_name;
//     var movie_name;
//     var sql_region = 'SELECT region FROM cinema GROUP BY region  ;';
//     connection.query(sql_region, function (error, resultsr, fields) {
//         results_region = new Array;
//         for (let i = 0; i < resultsr.length; i++) {
//             results_region[i] = resultsr[i].region;
//         }
//         results_cinema = Array.from(Array(results_region.length), () => Array());
//         var sql_cinema = 'SELECT region, cinema_name FROM cinema ;';
//         connection.query(sql_cinema, function (error, resultsc, fields) {
//             for (let i = 0; i < resultsc.length; i++) {
//                 for (let j = 0; j < results_region.length; j++) {
//                     if (resultsc[i].region == results_region[j]) {
//                         results_cinema[j][results_cinema[j].length] = resultsc[i].cinema_name;
//                     }
//                 }
//             }
//             if (statesplit[0] == '0' && statesplit[1] == '0' && statesplit[2] == '0') {
//                 var sql_movie = 'SELECT movie_name, age_restriction, genre, movie_img  FROM movie GROUP BY movie_name ORDER BY reservation_rates DESC';
//                 connection.query(sql_movie, function (error, resultsm, fields) {
//                     results_movie = Array.from(Array(resultsm.length), () => Array());
//                     for (let i = 0; i < resultsm.length; i++) {
//                         results_movie[i][0] = resultsm[i].movie_name;
//                         results_movie[i][1] = resultsm[i].age_restriction;
//                         results_movie[i][2] = resultsm[i].genre;
//                         results_movie[i][3] = resultsm[i].movie_img;
//                     }
//                     var sql_date = 'SELECT date FROM box_office GROUP BY date';
//                     connection.query(sql_date, function (error, resultsd, fields) {
//                         results_date = Array.from(Array(resultsd.length), () => Array());
//                         for (let i = 0; i < resultsd.length; i++) {
//                             var str = String(resultsd[i].date).split("-")[0];
//                             str = str.split(" ")
//                             for (j = 0; j < 3; j++) {
//                                 results_date[i][j] = str[j];
//                             }
//                         }
//                         res.render('reservation', {
//                             logined: login.logined,
//                             username: login.username,
//                             reservation_information: [region, "", "", "", "", "", ""],
//                             results_region,
//                             results_cinema,
//                             results_movie,
//                             results_date,
//                             results_screen: null,
//                             state
//                         })

//                     })
//                 })
//             }

//             else if (statesplit[0] != '0') {// 100 101 110 111
//                 var sql_box_office = 'SELECT date FROM box_office NATURAL JOIN movie NATURAL JOIN cinema NATURAL JOIN screen WHERE cinema_id = ? GROUP BY date';
//                 connection.query(sql_box_office, [parseInt(statesplit[0])], function (error, result_box, fields) {
//                     results_date = Array.from(Array(result_box.length), () => Array());
//                     for (let i = 0; i < result_box.length; i++) {
//                         var str = String(result_box[i].date).split("-")[0];
//                         str = str.split(" ")
//                         for (j = 0; j < 3; j++) {
//                             results_date[i][j] = str[j];
//                         }
//                     }

//                     var sql_movie = 'SELECT movie_name, age_restriction, genre,movie_img,cinema_name,region FROM movie NATURAL JOIN box_office natural join cinema natural join screen where cinema_id = ?  GROUP BY movie_name  ORDER BY ratio desc ;'
//                     connection.query(sql_movie, [parseInt(statesplit[0])], function (error, resultsm_select_cinema, fields) {
//                         region = resultsm_select_cinema[0].region;
//                         cinema_name = resultsm_select_cinema[0].cinema_name;
//                         results_movie = Array.from(Array(resultsm_select_cinema.length), () => Array());
//                         for (let i = 0; i < resultsm_select_cinema.length; i++) {
//                             results_movie[i][0] = resultsm_select_cinema[i].movie_name;
//                             results_movie[i][1] = resultsm_select_cinema[i].age_restriction;
//                             results_movie[i][2] = resultsm_select_cinema[i].genre;
//                             results_movie[i][3] = resultsm_select_cinema[i].movie_img;
//                         }
//                         if (statesplit[1] == '0') {// 100 101
//                             if (statesplit[2] == '0') {
//                                 res.render('reservation', {//100
//                                     logined: login.logined,
//                                     username: login.username,
//                                     reservation_information: [region, cinema_name, "", "", "", "", ""],
//                                     results_region,
//                                     results_cinema,
//                                     results_movie,
//                                     results_date,
//                                     results_screen: null,
//                                     state
//                                 })
//                             } else {//101
//                                 var sql_cinema = 'SELECT region, cinema_name,date FROM box_office NATURAL JOIN movie NATURAL JOIN screen NATURAL JOIN cinema;';
//                                 var sql_movie = 'SELECT date,movie_name, age_restriction, genre, movie_img,movie_id FROM movie NATURAL JOIN box_office NATURAL join cinema WHERE cinema_id = ? ORDER BY reservation_rates DESC';
//                                 connection.query(sql_cinema + sql_movie, [parseInt(statesplit[0]), parseInt(statesplit[0])], function (error, resultscm, fields) {
//                                     results_cinema = Array.from(Array(results_region.length), () => Array());
//                                     for (let i = 0; i < resultscm[0].length; i++) {
//                                         var str = String(resultscm[0][i].date).split("-")[0];
//                                         str = str.split(" ")
//                                         if (statesplit[2] == str[2]) {
//                                             for (let j = 0; j < results_region.length; j++) {
//                                                 if (resultscm[0][i].region == results_region[j]) {
//                                                     let s = 0;
//                                                     for (let k = 0; k < results_cinema[j].length; k++) {
//                                                         if (results_cinema[j][k] == resultscm[0][i].cinema_name) {
//                                                             s = 1;
//                                                         }
//                                                     }
//                                                     if (s == 0) results_cinema[j][results_cinema[j].length] = resultscm[0][i].cinema_name;
//                                                 }
//                                             }
//                                         }
//                                     }
//                                     var l = 0;
//                                     let list = new Array();
//                                     console.log(resultscm[1])
//                                     for (let i = 0; i < resultscm[1].length; i++) {
//                                         var str = String(resultscm[1][i].date).split("-")[0];
//                                         str = str.split(" ")
//                                         if (statesplit[2] == str[2]) {
//                                             let s = 0;
//                                             for (let k = 0; k < list.length; k++) {
//                                                 if (list[k] == resultscm[1][i].movie_name) s = 1;
//                                             }
//                                             if (s == 0) {
//                                                 list[l] = resultscm[1][i].movie_name;
//                                                 l++;
//                                             };
//                                         }
//                                     }
//                                     results_movie = Array.from(Array(l), () => Array());
//                                     if (l > 0) {
//                                         for (let i = 0, k = 0; i < resultscm[1].length; i++) {
//                                             var str = String(resultscm[1][i].date).split("-")[0];
//                                             str = str.split(" ")
//                                             if (statesplit[2] == str[2]) {
//                                                 if (statesplit[2] == str[2]) {
//                                                     let s = 0;
//                                                     for (let k = 0; k < list.length; k++) {
//                                                         if (results_movie[k][0] == resultscm[1][i].movie_name) s = 1;
//                                                     }
//                                                     if (s == 0) {
//                                                         results_movie[k][0] = resultscm[1][i].movie_name;
//                                                         results_movie[k][1] = resultscm[1][i].age_restriction;
//                                                         results_movie[k][2] = resultscm[1][i].genre;
//                                                         results_movie[k][3] = resultscm[1][i].movie_img;
//                                                         k++;
//                                                     };
//                                                 }

//                                             }
//                                         }
//                                     }

//                                     res.render('reservation', {
//                                         logined: login.logined,
//                                         username: login.username,
//                                         reservation_information: [region, cinema_name, "", statesplit[2], "", "", ""],
//                                         results_region,
//                                         results_cinema,
//                                         results_movie,
//                                         results_date,
//                                         results_screen: null,
//                                         state
//                                     })
//                                 })
//                             }
//                         } else {//110 // 111
//                             var sql_date = 'SELECT date FROM box_office NATURAL JOIN movie NATURAL JOIN cinema NATURAL JOIN screen WHERE cinema_id = ? AND movie_id = ? GROUP BY date';
//                             connection.query(sql_date, [parseInt(statesplit[0]), parseInt(statesplit[1])], function (error, resultsd, fields) {
//                                 results_date = Array.from(Array(resultsd.length), () => Array());
//                                 for (let i = 0; i < resultsd.length; i++) {
//                                     var str = String(resultsd[i].date).split("-")[0];
//                                     str = str.split(" ")
//                                     for (j = 0; j < 3; j++) {
//                                         results_date[i][j] = str[j];
//                                     }
//                                 }
//                                 var sql_movie = 'SELECT movie_name FROM movie where movie_id = ?';
//                                 connection.query(sql_movie, [parseInt(statesplit[1])], function (error, resultsm, fields) {
//                                     movie_name = resultsm[0].movie_name
//                                     if (statesplit[2] == '0') {//110
//                                         var sql_cinema = 'SELECT region, cinema_name,date FROM box_office NATURAL JOIN movie NATURAL JOIN screen NATURAL JOIN cinema WHERE movie_id = ? GROUP BY cinema_name;'
//                                         connection.query(sql_cinema, [statesplit[1]], function (error, resultsc, fields) {
//                                             results_cinema = Array.from(Array(results_region.length), () => Array());
//                                             for (let i = 0; i < resultsc.length; i++) {
//                                                 for (let j = 0; j < results_region.length; j++) {
//                                                     if (resultsc[i].region == results_region[j]) {
//                                                         results_cinema[j][results_cinema[j].length] = resultsc[i].cinema_name;
//                                                     }
//                                                 }
//                                             }
//                                             res.render('reservation', {
//                                                 logined: login.logined,
//                                                 username: login.username,
//                                                 reservation_information: [region, cinema_name, movie_name, "", "", "", ""],
//                                                 results_region,
//                                                 results_cinema,
//                                                 results_movie,
//                                                 results_date,
//                                                 results_screen: null,
//                                                 state
//                                             })
//                                         })
//                                     } else {//111
//                                         var sql_cinema = 'SELECT region, cinema_name,date FROM box_office NATURAL JOIN movie NATURAL JOIN screen NATURAL JOIN cinema WHERE movie_id = ?;';
//                                         var sql_movie = 'SELECT date,movie_name, age_restriction, genre, movie_img,movie_id FROM movie NATURAL JOIN box_office NATURAL JOIN screen NATURAL JOIN cinema WHERE cinema_id = ? ORDER BY reservation_rates DESC';
//                                         connection.query(sql_cinema + sql_movie, [parseInt(statesplit[1]), parseInt(statesplit[0])], function (error, resultscm, fields) {
//                                             results_cinema = Array.from(Array(results_region.length), () => Array());
//                                             for (let i = 0; i < resultscm[0].length; i++) {
//                                                 var str = String(resultscm[0][i].date).split("-")[0];
//                                                 str = str.split(" ")
//                                                 if (statesplit[2] == str[2]) {
//                                                     for (let j = 0; j < results_region.length; j++) {
//                                                         if (resultscm[0][i].region == results_region[j]) {
//                                                             let s = 0;
//                                                             for (let k = 0; k < results_cinema[j].length; k++) {
//                                                                 if (results_cinema[j][k] == resultscm[0][i].cinema_name) {
//                                                                     s = 1;
//                                                                 }
//                                                             }
//                                                             if (s == 0) results_cinema[j][results_cinema[j].length] = resultscm[0][i].cinema_name;
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                             var l = 0;
//                                             let list = new Array();
//                                             for (let i = 0; i < resultscm[1].length; i++) {
//                                                 var str = String(resultscm[1][i].date).split("-")[0];
//                                                 str = str.split(" ")
//                                                 if (statesplit[2] == str[2]) {
//                                                     let s = 0;
//                                                     for (let k = 0; k < list.length; k++) {
//                                                         if (list[k] == resultscm[1][i].movie_name) s = 1;
//                                                     }
//                                                     if (s == 0) {
//                                                         list[l] = resultscm[1][i].movie_name;
//                                                         l++;
//                                                     };
//                                                 }
//                                             }
//                                             results_movie = Array.from(Array(l), () => Array());
//                                             if (l > 0) {
//                                                 for (let i = 0, k = 0; i < resultscm[1].length; i++) {
//                                                     var str = String(resultscm[1][i].date).split("-")[0];
//                                                     str = str.split(" ")
//                                                     if (statesplit[2] == str[2]) {
//                                                         if (statesplit[2] == str[2]) {
//                                                             let s = 0;
//                                                             for (let k = 0; k < list.length; k++) {
//                                                                 if (results_movie[k][0] == resultscm[1][i].movie_name) s = 1;
//                                                             }
//                                                             if (s == 0) {
//                                                                 results_movie[k][0] = resultscm[1][i].movie_name;
//                                                                 results_movie[k][1] = resultscm[1][i].age_restriction;
//                                                                 results_movie[k][2] = resultscm[1][i].genre;
//                                                                 results_movie[k][3] = resultscm[1][i].movie_img;
//                                                                 k++;
//                                                             };
//                                                         }

//                                                     }
//                                                 }
//                                             }
//                                             var sql_screen = 'SELECT date,box_office_id, type,start_time, screen_no, seat_state FROM box_office NATURAL JOIN screen NATURAL JOIN cinema NATURAL JOIN movie WHERE cinema_id =? AND movie_id = ? ORDER BY start_time  ';
//                                             connection.query(sql_screen, [parseInt(statesplit[0]), parseInt(statesplit[1])], function (error, resultss, fields) {
//                                                 var l = 0;
//                                                 let list = new Array();
//                                                 for (let i = 0; i < resultss.length; i++) {
//                                                     var str = String(resultss[i].date).split("-")[0];
//                                                     str = str.split(" ")
//                                                     if (statesplit[2] == str[2]) {
//                                                         let s = 0;
//                                                         for (let k = 0; k < list.length; k++) {
//                                                             if (list[k] == resultss[i].box_office_id) s = 1;
//                                                         }
//                                                         if (s == 0) {
//                                                             list[l] = resultss[i].box_office_id;
//                                                             l++;
//                                                         };
//                                                     }
//                                                 }
//                                                 results_screen = Array.from(Array(l), () => Array());
//                                                 for (let i = 0, k = 0; i < resultss.length; i++) {
//                                                     var str = String(resultss[i].date).split("-")[0];
//                                                     str = str.split(" ")
//                                                     if (statesplit[2] == str[2]) {
//                                                         seats = resultss[i].seat_state.split('[');
//                                                         seats.splice(0, 2);
//                                                         for (let j = 0; j < seats.length; j++) {
//                                                             seat = new Array();
//                                                             seats[j] = seats[j].split(']')[0];
//                                                             for (let k = 0, l = 0; k < seats[j].length; k++) {
//                                                                 if (seats[j][k] != ',') {
//                                                                     seat[l] = parseInt(seats[j][k]);
//                                                                     l++;
//                                                                 }
//                                                             }
//                                                             seats[j] = seat
//                                                         }
//                                                         results_screen[k][0] = resultss[i].box_office_id;
//                                                         results_screen[k][1] = resultss[i].start_time;
//                                                         results_screen[k][2] = resultss[i].screen_no;
//                                                         results_screen[k][3] = seats;
//                                                         k++;
//                                                     }
//                                                 }
//                                                 res.render('reservation', {
//                                                     logined: login.logined,
//                                                     username: login.username,
//                                                     reservation_information: [region, cinema_name, movie_name, statesplit[2], "", "", ""],
//                                                     results_region,
//                                                     results_cinema,
//                                                     results_movie,
//                                                     results_date,
//                                                     results_screen,
//                                                     state
//                                                 })
//                                             })
//                                         })
//                                     }
//                                 })
//                             })
//                         }
//                     })
//                 })
//             } else if (statesplit[1] != '0') {//010 011
//                 var sql_movie = 'SELECT movie_name, age_restriction, genre, movie_img,movie_id FROM movie GROUP BY movie_name ORDER BY reservation_rates DESC';
//                 connection.query(sql_movie, [parseInt(statesplit[1])], function (error, resultsm, fields) {

//                     results_movie = Array.from(Array(resultsm.length), () => Array());
//                     for (let i = 0; i < resultsm.length; i++) {
//                         if (parseInt(statesplit[1]) == resultsm[i].movie_id) { var movie_name = resultsm[i].movie_name; }
//                         results_movie[i][0] = resultsm[i].movie_name;
//                         results_movie[i][1] = resultsm[i].age_restriction;
//                         results_movie[i][2] = resultsm[i].genre;
//                         results_movie[i][3] = resultsm[i].movie_img;
//                     }
//                     var sql_date = 'SELECT date FROM box_office NATURAL JOIN movie WHERE movie_id = ? GROUP BY date';
//                     connection.query(sql_date, [statesplit[1]], function (error, resultsd, fields) {

//                         results_date = Array.from(Array(resultsd.length), () => Array());
//                         for (let i = 0; i < resultsd.length; i++) {
//                             var str = String(resultsd[i].date).split("-")[0];
//                             str = str.split(" ")
//                             for (j = 0; j < 3; j++) {
//                                 results_date[i][j] = str[j];
//                             }
//                         }
//                         if (statesplit[2] == '0') {//010
//                             var sql_cinema = 'SELECT region, cinema_name,date FROM box_office NATURAL JOIN movie NATURAL JOIN screen NATURAL JOIN cinema WHERE movie_id = ? GROUP BY cinema_name;'
//                             connection.query(sql_cinema, [statesplit[1]], function (error, resultsc, fields) {
//                                 results_cinema = Array.from(Array(results_region.length), () => Array());
//                                 for (let i = 0; i < resultsc.length; i++) {
//                                     for (let j = 0; j < results_region.length; j++) {
//                                         if (resultsc[i].region == results_region[j]) {
//                                             results_cinema[j][results_cinema[j].length] = resultsc[i].cinema_name;
//                                         }
//                                     }
//                                 }
//                                 res.render('reservation', {
//                                     logined: login.logined,
//                                     username: login.username,
//                                     reservation_information: [region, "", movie_name, "", "", "", ""],
//                                     results_region,
//                                     results_cinema,
//                                     results_movie,
//                                     results_date,
//                                     results_screen: null,
//                                     state
//                                 })

//                             })
//                         } else {//011
//                             var sql_cinema = 'SELECT region, cinema_name,date FROM box_office NATURAL JOIN movie NATURAL JOIN screen NATURAL JOIN cinema WHERE movie_id = ?;';
//                             var sql_movie = 'SELECT date,movie_name, age_restriction, genre, movie_img,movie_id FROM movie NATURAL JOIN box_office ORDER BY reservation_rates DESC';
//                             connection.query(sql_cinema + sql_movie, [parseInt(statesplit[1])], function (error, resultscm, fields) {
//                                 results_cinema = Array.from(Array(results_region.length), () => Array());
//                                 for (let i = 0; i < resultscm[0].length; i++) {
//                                     var str = String(resultscm[0][i].date).split("-")[0];
//                                     str = str.split(" ")
//                                     if (statesplit[2] == str[2]) {
//                                         for (let j = 0; j < results_region.length; j++) {
//                                             if (resultscm[0][i].region == results_region[j]) {
//                                                 let s = 0;
//                                                 for (let k = 0; k < results_cinema[j].length; k++) {
//                                                     if (results_cinema[j][k] == resultscm[0][i].cinema_name) {
//                                                         s = 1;
//                                                     }
//                                                 }
//                                                 if (s == 0) results_cinema[j][results_cinema[j].length] = resultscm[0][i].cinema_name;
//                                             }
//                                         }
//                                     }
//                                 }
//                                 var l = 0;
//                                 let list = new Array();
//                                 for (let i = 0; i < resultscm[1].length; i++) {
//                                     var str = String(resultscm[1][i].date).split("-")[0];
//                                     str = str.split(" ")
//                                     if (statesplit[2] == str[2]) {
//                                         let s = 0;
//                                         for (let k = 0; k < list.length; k++) {
//                                             if (list[k] == resultscm[1][i].movie_name) s = 1;
//                                         }
//                                         if (s == 0) {
//                                             list[l] = resultscm[1][i].movie_name;
//                                             l++;
//                                         };
//                                     }
//                                 }
//                                 results_movie = Array.from(Array(l), () => Array());
//                                 if (l > 0) {
//                                     for (let i = 0, k = 0; i < resultscm[1].length; i++) {
//                                         var str = String(resultscm[1][i].date).split("-")[0];
//                                         str = str.split(" ")
//                                         if (statesplit[2] == str[2]) {
//                                             if (statesplit[2] == str[2]) {
//                                                 let s = 0;
//                                                 for (let k = 0; k < list.length; k++) {
//                                                     if (results_movie[k][0] == resultscm[1][i].movie_name) s = 1;
//                                                 }
//                                                 if (s == 0) {
//                                                     results_movie[k][0] = resultscm[1][i].movie_name;
//                                                     results_movie[k][1] = resultscm[1][i].age_restriction;
//                                                     results_movie[k][2] = resultscm[1][i].genre;
//                                                     results_movie[k][3] = resultscm[1][i].movie_img;
//                                                     k++;
//                                                 };
//                                             }

//                                         }
//                                     }
//                                 }
//                                 res.render('reservation', {
//                                     logined: login.logined,
//                                     username: login.username,
//                                     reservation_information: [region, "", movie_name, statesplit[2], "", "", ""],
//                                     results_region,
//                                     results_cinema,
//                                     results_movie,
//                                     results_date,
//                                     results_screen: null,
//                                     state
//                                 })
//                             })
//                         }
//                     })

//                 })
//             } else { //001
//                 var sql_date = 'SELECT date FROM box_office GROUP BY date';
//                 connection.query(sql_date, function (error, resultsd, fields) {
//                     results_date = Array.from(Array(resultsd.length), () => Array());
//                     for (let i = 0; i < resultsd.length; i++) {
//                         var str = String(resultsd[i].date).split("-")[0];
//                         str = str.split(" ")
//                         for (j = 0; j < 3; j++) {
//                             results_date[i][j] = str[j];
//                         }
//                     }
//                     var sql_cinema = 'SELECT region, cinema_name,date FROM box_office NATURAL JOIN movie NATURAL JOIN screen NATURAL JOIN cinema ;';
//                     var sql_movie = 'SELECT date,movie_name, age_restriction, genre, movie_img,movie_id FROM movie NATURAL JOIN box_office ORDER BY reservation_rates DESC';
//                     connection.query(sql_cinema + sql_movie, function (error, resultscm, fields) {
//                         results_cinema = Array.from(Array(results_region.length), () => Array());
//                         for (let i = 0; i < resultscm[0].length; i++) {
//                             var str = String(resultscm[0][i].date).split("-")[0];
//                             str = str.split(" ")
//                             if (statesplit[2] == str[2]) {
//                                 for (let j = 0; j < results_region.length; j++) {
//                                     if (resultscm[0][i].region == results_region[j]) {
//                                         let s = 0;
//                                         for (let k = 0; k < results_cinema[j].length; k++) {
//                                             if (results_cinema[j][k] == resultscm[0][i].cinema_name) {
//                                                 s = 1;
//                                             }
//                                         }
//                                         if (s == 0) results_cinema[j][results_cinema[j].length] = resultscm[0][i].cinema_name;
//                                     }
//                                 }
//                             }
//                         }

//                         var l = 0;
//                         let list = new Array();
//                         for (let i = 0; i < resultscm[1].length; i++) {
//                             var str = String(resultscm[1][i].date).split("-")[0];
//                             str = str.split(" ")
//                             if (statesplit[2] == str[2]) {
//                                 let s = 0;
//                                 for (let k = 0; k < list.length; k++) {
//                                     if (list[k] == resultscm[1][i].movie_name) s = 1;
//                                 }
//                                 if (s == 0) {
//                                     list[l] = resultscm[1][i].movie_name;
//                                     l++;
//                                 };
//                             }
//                         }
//                         results_movie = Array.from(Array(l), () => Array());
//                         if (l > 0) {
//                             for (let i = 0, k = 0; i < resultscm[1].length; i++) {
//                                 var str = String(resultscm[1][i].date).split("-")[0];
//                                 str = str.split(" ")
//                                 if (statesplit[2] == str[2]) {
//                                     if (statesplit[2] == str[2]) {
//                                         let s = 0;
//                                         for (let k = 0; k < list.length; k++) {
//                                             if (results_movie[k][0] == resultscm[1][i].movie_name) s = 1;
//                                         }
//                                         if (s == 0) {
//                                             results_movie[k][0] = resultscm[1][i].movie_name;
//                                             results_movie[k][1] = resultscm[1][i].age_restriction;
//                                             results_movie[k][2] = resultscm[1][i].genre;
//                                             results_movie[k][3] = resultscm[1][i].movie_img;
//                                             k++;
//                                         };
//                                     }

//                                 }
//                             }
//                         }

//                         res.render('reservation', {
//                             logined: login.logined,
//                             username: login.username,
//                             reservation_information: [region, "", "", statesplit[2], "", "", ""],
//                             results_region,
//                             results_cinema,
//                             results_movie,
//                             results_date,
//                             results_screen: null,
//                             state
//                         })
//                     })

//                 })
//             }
//         });
//     })
// });

router.get('/reserv_seat/:box_office_id', function (req, res) {
    var box_office_id = req.url.split("/")[2];
    var seats;
     res.render('reservation_seat', {
            logined: login.logined,
            username: login.username,
            reservation_information: ["", "CGV용산", "samsung", "2019.01.01", String(3).concat("","관"), "09:30", 2],
            seats,
            box_office_id
        });

});

// router.get('/reserv_seat/:box_office_id', function (req, res) {
//     var box_office_id = req.url.split("/")[2];
//     var sql = ' select cinema_name, movie_name, date,screen_no,start_time, screen_no, seat_state from box_office  natural join movie natural join cinema natural join screen where box_office_id = ?;'
//     connection.query(sql, [parseInt(box_office_id)], function (error, results, field) {
//         var str = String(results[0].date).split("-")[0];
//         str = str.split(" ")
//         var date = new Array() ;
//         for (j = 0; j < 3; j++) {
//             date.push(str[j]);
//         }
//         var seats = results[0].seat_state.split('[');
//         seats.splice(0, 2);
//         for (let j = 0; j < seats.length; j++) {
//             seat = new Array();
//             seats[j] = seats[j].split(']')[0];
//             for (let k = 0, l = 0; k < seats[j].length; k++) {
//                 if (seats[j][k] != ',') {
//                     seat[l] = parseInt(seats[j][k]);
//                     l++;
//                 }
//             }
//             seats[j] = seat
//         }
//         start_time = results[0].start_time.split(':');
//         start_time = start_time[0].concat(':', start_time[1]);
       
//         res.render('reservation_seat', {
//             logined: login.logined,
//             username: login.username,
//             reservation_information: ["", results[0].cinema_name, results[0].movie_name, date, String(results[0].screen_no).concat("","관"), start_time, box_office_id],
//             seats,
//             box_office_id
//         });
//     })

// });


router.post('/:state', function (req, res) {
    var info = req.body.info.split(',');
    if (info == '다시하기') {
        res.redirect(`/reserv/0_0_0`);
    } else {
        if (info[6] > 0) {
            res.redirect(`/resrv/reserv_seat/${info[6]}`);
        }
        else {
            var str2 = "_";
            var sql1 = 'SELECT cinema_id FROM cinema WHERE cinema_name = ?;'
            var sql2 = 'SELECT movie_id FROM movie WHERE movie_name = ?;'
            connection.query(sql1 + sql2, [info[1], info[2]], function (error, results, field) {
                if (info[1] == '') { str1 = '0'; } else if (info[1] != '0') { str1 = String(results[0][0].cinema_id); }
                if (info[2] == '') { str3 = '0'; } else if (info[2] != '0') { str3 = String(results[1][0].movie_id); }
                if (info[3] == '') { str4 = '0'; } else if (info[3] != '0') { str4 = info[3]; }
                res.redirect(`/reserv/${str1.concat(str2, str3).concat(str2, str4)}`);
            })
        }
    }
});

router.post('/reserv_seat/:box_office_id', function (req, res) {
    var info_m = req.body.info_m;
    var info_s = req.body.info_s;
    var info_b = req.body.info_b;
    console.log(info_m,info_s,info_b);
    res.render('payment', {
        logined: login.logined,
        username: login.username,
        info_m
    });
   
})


module.exports = router;