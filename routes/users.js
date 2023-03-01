var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var pwdconf = req.body.pwdconf;
  var birth = req.body.birth;
  var sex = req.body.sex;
  var address = req.body.address;
    var phone_number = req.body.phone_number;
    var email_address = req.body.email;

    if (password !== pwdconf) {
        res.redirect('register');
    }
    else {
        var sql = 'SELECT * FROM member WHERE username = ?';
        connection.query(sql, [username], function (error, results, fields) {
            if (results.length == 0) {
                connection.query(`INSERT INTO \`cenema\`.\`member\` ( \`username\`, \`password\`, \`birth\`, \`sex\`,\ \`address\`, \`phone_number\`, \`email_address\`) VALUES ( \'${username}\', \'${password}\', \'${birth}\', \'${sex}\', \'${address}\', \'${phone_number}\', \'${email_address}\');`,function (err){
                    if(err){
                        console.log("error");
                    }
                    res.redirect('login');
                });
            }
            else {
                res.render("register");
            }
        });
    }
});


module.exports = router;
