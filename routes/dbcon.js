var mysql = require('mysql');


const dbPool = mysql.createPool({
    multipleStatements: true,
    host: '127.0.0.1',
    user: 'userA',
    post: 3306,
    password: 'secret',
    database: 'multiplex_reservation',
    connectionLimit: 10
});

const getConnection = function(callback) {
	dbPool.getConnection(function(err, conn){
		if(!err){
			callback(conn);
			conn.release();
		}
	});
}


module.exports = { getConnection };