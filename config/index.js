const mongodbConfig = require('./mongo')
const serverConfig = require('./server')




module.exports.get = function (url){
	
	switch(url) {
	  case 'mongo':
	    return mongodbConfig
	    break;
	
	  case 'server':
	    return serverConfig
	    break;
	 
	  default:
	    return null
	}
}
