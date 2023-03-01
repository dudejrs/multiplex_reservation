var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
// var AWS = require('aws-sdk');
// AWS.config.region = 'ap-northeast-2';
// var ec2 = new AWS.EC2();
var dateFormat = require('dateformat');

// var connection = mysql.createConnection({
//   post: 3306,
//   host: "cenema.cpnxmgyidpor.ap-northeast-2.rds.amazonaws.com",
//   user: "admin",
//   password: "11111111",
//   database: 'cenema',
//   multipleStatements: true
// });


var connection = mysql.createConnection({
    multipleStatements: true,
    host: '127.0.0.1',
    user: 'userA',
    post: 3306,
    password: 'secret',
    database: 'multiplex_reservation',
    multipleStatements: true
});

router.use(session({
  secret: 'sid',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    res.render('adminindex', {
      logined: req.session.user.logined,
      employee_name: req.session.user.employee_name,
      employee_rank: req.session.user.employee_rank
    })
  } else {
    res.render('adminIndex', {
      logined: false,
      employee_name: " "
    });
  }
});

router.get('/login', function (req, res, next) {
  res.render('adminlogin');
})

router.get('/info', function (req, res, next) {
  var cinema_id = req.session.user.cinema_id;
  var sql = 'SELECT * FROM employee where cinema_id = ?';
  connection.query(sql, [cinema_id], function (error, results, fields) {
    res.render('info', {
      results
    });
  });
});

router.get('/sales', function (req, res, next) {
  var sql1 = 'SELECT * from movie natural join sales group by movie_name order by movie_id; ';
  var sql2 = 'SELECT date, movie_name, movie_id, sales from movie natural join sales order by movie_id, date';
  connection.query(sql1 + sql2, function (error, results, fields) {
    console.log(results[1][0]);
    res.render('sales', {
      results1: results[0],
      results2: results[1]
    });
  });
});

router.get('/salary', function (req, res, next) {
  var sql1 = 'SELECT * from schedule; ';
  var sql2 = 'SELECT * from work';
  connection.query(sql2, function (error, results, fields) {
    console.log(results);
    res.render('salary', {
      // results1 : results[0],
      // results2 : results[1]
      results
    });
  });
});

router.get('/rewards', function (req, res, next) {
  var sql1 = 'SELECT * from schedule; ';
  var sql2 = 'SELECT * from work';
  connection.query(sql1 + sql2, function (error, results, fields) {

    res.render('rewards', {
      results1: results[0],
      results2: results[1]
    });
  });
});

router.get('/vacation', function (req, res, next) {
  var cinema_id = req.session.user.cinema_id;
  var sql1 = 'SELECT * FROM vacation NATURAL JOIN employee where cinema_id = ?; ';
  var sql2 = 'SELECT * FROM vacation_log';
  
  connection.query(sql1 + sql2, [cinema_id], function (error, results, fields) {
    var sdate = String(results[1][0].sdate).split('-');
    res.render('vacation', {
      results1: results[0],
      results2: results[1]
      
    });
  });
});

module.exports = router;

router.post('/', function (req, res) {
  var employee_name = req.body.employee_name;
  var password = req.body.password;

  var sql = 'SELECT * FROM employee WHERE employee_name = ?';
  connection.query(sql, [employee_name], function (error, results, fields) {
    if (results.length == 0) {
      res.render('adminIndex');
    } else {
      var db_pwd = results[0].employee_id;

      if (password == db_pwd) {
        req.session.user = {
          logined: true,
          employee_name: results[0].employee_name,
          employee_rank: results[0].employee_rank,
          cinema_id: results[0].cinema_id
        }

        res.render('adminindex', {
          logined: req.session.user.logined,
          employee_name: req.session.user.employee_name,
          employee_rank: req.session.user.employee_rank,
          cinema_id: req.session.user.cinema_id
        });
      }
      else {
        res.render('adminIndex');
      }
    }
  });
});


router.post('/info', function (req, res, next) {
  var employee_name = req.body.employee_name;
  var phone_number = req.body.phone_number;
  var join_date = req.body.join_date;
  var cinema_id = req.body.cinema_id;
  var employee_rank = req.body.employee_rank;
  // console.log(dateFormat(reuslts.join_date, "yyyymm-----dd"));

  var sql = 'INSERT into employee(employee_name, phone_number, join_date, cinema_id, employee_rank) VALUES(?,?,?,?,?)';
  connection.query(sql, [employee_name, phone_number, join_date, cinema_id, employee_rank], function (error, results, fields) {
    res.redirect('info');
  });
});

router.post('/sales', function (req, res, next) {

});

router.post('/salary', function (req, res, next) {
  var employee_id = req.body.employee_id;
  console.log(employee_id);

  var sql = 'SELECT * from work_log natural join employee where employee_id = ?'
  connection.query(sql, [employee_id], function (error, results, fields) {
    console.log(results);
    res.render('salary', {
      results
    });
  });
});

router.post('/vacation', function (req, res, next) {
  var employee_id = req.body.employee_id;
  var sdate = req.body.sdate;
  var edate = req.body.edate;

  var sql = 'INSERT into vacation_log(employee_id, sdate, edate) VALUES(?,?,?)';
  connection.query(sql, [employee_id, sdate, edate], function (error, results, fields) {
    res.redirect('vacation');
  });
});

