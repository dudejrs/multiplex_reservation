const jwt = require('jsonwebtoken');

export.verifyToken = (req, res, token) =>{
	try{
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
		return next();
	}catch(error){
		if(error.name === "TokenExpiredErro"){
			return res.status(419).json({
				code: 419,
				message: '토큰이 만료되었음'
			});
		}
		return res.status(401).json({
			code: 401,
			message : '유효하지 않은 토큰'
		});
	}
};