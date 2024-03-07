const Jwt = require('jsonwebtoken');
const _ = require('lodash');
const moment = require('moment');
const Config = require('../config');
const secret = Config.get('server').secret
const configServer = Config.get('server');
const authKey = Config.get('server').authKey




function createJWToken(details) {
	
  let token = Jwt.sign({
     data: details
    }, secret,
    { algorithm: 'HS256' }, {})

  return token;
}





function verifyCommonJWT(req,res,next) {
    
	try {

		console.log(" here array --------------------")
  
		  let token = req.headers['x-access-token'] || req.headers['authorization']
  
		  if (!token || !token.startsWith('Bearer ')) {
				return res.status(401).send({status:401,message:'Unauthorized'})
		  }
		  else {
			  token = token.slice(7, token.length);
			  Jwt.verify(token, secret, (err, decodedToken) => {
				  if(err) {
					  
					  res.status(401).send({status:401,message:'Unauthorized'})
				  }else{
						  req.credentials = decodedToken
						  next()
				  }
			  })
		  }
	}
	catch(err) {
			res.status(400).send({status:400,message:err.message})
	}
	  
  }

  


  function getUserId (request) {
	console.log(" +++++++++++++++++++++ ",request.credentials)
	  return _.get(request, 'credentials.data.userId', false)
}




function isAdmin (request) {
	 //console.log(request)
	  return _.get(request, 'data.scope', false)
}



function validAuthKey(request) {
  if (request.headers.auth === authKey) {
	request.lang=(request.headers.lang)?request.headers.lang:'English';

    return true;
  }
  else {
    return false
  }
}


module.exports = {
	createJWToken,
	getUserId,
	validAuthKey,
	verifyCommonJWT
	
}