const jwt = require('jsonwebtoken');

exports.publishTokenIFNotExist = (req, res, next) =>{
	if(!req.cookies.authorization){
		res.redirect("/login")
	}
}


exports.verifyToken = (req, res, next) =>{
	try{
		const decoded = jwt.verify(req.signedCookies.authorization, process.env.JWT_SECRET);
		
		req.session.login = {
			logined : true,
			username : decoded.username,
			member_id : decoded.member_id
		}




		return next();
	}catch(error){
		if(error.name === "TokenExpiredErro"){
			res.clearCookie('authorization', req.cookies.authorization, {
				expires: new Date(Date.now() + 900000),
				httpOnly : true,
				secure : true,
				signed : true
			});
			// client error처리
		}
		return next();
	}
};