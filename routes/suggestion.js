var express = require('express');
var router = express.Router();

var login = {
    logined : false,
    username : "",
    member_id : -1
}



router.get('/', function (req, res) {
    var sql = 'SELECT * FROM suggestion natural join member;';
    connection.query(sql, function (error, results, fields) {
        if (req.session.user) {
            res.render('suggestion', {
                logined: req.session.user.logined,
                username: req.session.user.username,
                results
            });
        }
        else {
            res.render('suggestion', {
                logined: login.logined,
                username: login.username,
                results
            });
        }
    });
});

router.get('/suggestion_insert', function (req, res) {
    if (req.session.user) {
        res.render('suggestion_insert', {
            logined: req.session.user.logined,
            username: req.session.user.username
        });
    }
    else {
        res.redirect('login');
    }
});

router.get('/:suggestion_id', function (req, res) {
    var suggestion_id = req.url.split("/")[2];
    var sql1 = 'SELECT * FROM suggestion natural join member WHERE suggestion_id = ?; ';
    var sql2 = 'SELECT * FROM comment natural join member WHERE suggestion_id = ?; ';

    connection.query('UPDATE suggestion SET view = view + 1 WHERE suggestion_id = ?', [suggestion_id]);
    connection.query(sql1 + sql2, [suggestion_id, suggestion_id], function(error, results, fields){
        results1 = results[0];
        results2 = results[1];
        if (req.session.user) {    
            res.render('suggestion_id', {
                logined: req.session.user.logined,
                username: req.session.user.user_name,
                results1,
                results2,
                suggestion_id
            });
        }
        else {
            res.render('suggestion_id', {
                logined: false,
                username: " ",
                results1,
                results2,
                suggestion_id
            });
        }
    })
});


router.post('/suggestion_insert', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var writer_name = req.session.user.username;

    
    console.log(req.body);

    var sql = `INSERT INTO \`cenema\`.\`suggestion\` ( \`title\`, \`content\`, \`member_id\`) VALUES ( \'${title}\', \'${content}\', \'${login.member_id}\')`;
    connection.query(sql, function(error, results, fields) {
        res.redirect('/suggestion');
    });
});

router.post('/:suggestion_id', function(req, res){
    if(req.session.user){
        var suggestion_id = req.url.split("/")[2];
        var comment = req.body.comment;
        var writer_name = req.session.user.username;
        var sql = `INSERT INTO comment(suggestion_id, comment, writer_name) VALUES (?,?,?) ;`
        connection.query(sql, [suggestion_id, comment, writer_name], function(error, results, fields){
            res.redirect(`/suggestion/${suggestion_id}`);
        });
    }
    else {
        res.render('login.ejs');
    }
});


module.exports = router;