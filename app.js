var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var session = require('express-session');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var LoginRotuer= require("./routes/login");
var ReserveRouter= require("./routes/reserve");
var ApiRouter = require("./routes/api");
var UserRouter = require("./routes/users");
var PaymentRouter = require("./routes/payment");
var AuthRouter = require("./routes/auth");
var {getConnection} = require("./routes/dbcon");
var {verifyToken} = require("./routes/middlewares");

dotenv.config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));



//session
app.use(session({
    secret: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: "none",
        secure: true
    },
}));

app.use(verifyToken);

app.use(function(req,res,next){
    if(!req.session.login){
      req.session.login = {
        logined : false,
        username : "",
        member_id : -1
      }
    }

    req.db = {
      getConnection
    }

  next(); 
});


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use("/login", LoginRotuer);
app.use("/reserv", ReserveRouter);
app.use("/api", ApiRouter);
app.use("/auth", AuthRouter);
app.use("/register", UserRouter);
app.use("/paymenet", PaymentRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
