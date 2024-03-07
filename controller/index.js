var express = require('express');
var router = express.Router();
const Auth = require('../services/auth');
const CmmValidator = require('../validators/common-validator');
const Config = require('../config');

const userMaster= require('../model/userModel');
const userStockHis= require('../model/userStockModel');
const sdk = require('api')('@testalpacadocs/v1#1h66vlte7wfr6');


router.use(function (req, res, next) {

	const isValid = Auth.validAuthKey(req)
	if (isValid) {
		next()
	} else {
		res.status(401).send({
			status: 401,
			message: 'Invalid Auth Key'
		})
	}
});



router.get('/getAccountDetails',async function (req, res, next) {
	

	sdk.auth(`${Config.get('server').alpaca.api_key}`, `${Config.get('server').alpaca.api_secret}`);
	sdk.getAllAccounts()
	  .then(({ data }) => 
	     res.status(200).send({status:200,message:"Details fetch successfully",data:data})
	  )
	  .catch(err => 
		  res.status(500).send({status:500,message:err.message,data:{}})
		);
})


router.post('/userRegistration',CmmValidator.signup,async function (req, res, next) {

	try {
		let body= req.body;

		
		userMaster.create(body)
		.then(async (info) => {
			info=info.toObject();
			delete info.password;

			if(info){
				return res.status(200).send({status:200,message:"Registration done successfully",data:info})
			}else{
				return res.status(500).send({status:500,message:"Please try again",data:{}})
			}
		})
		.catch((error) => {
			return res.status(500).send({status:500,message:error.message,data:{}})

		});
	} catch (err) {
		return res.status(500).send({status:500,message:err.message,data:{}})
	}
	
})


router.post('/login', CmmValidator.login, function (req, res, next) {

	let body = req.body

	
	userMaster.findOne({
			email: body.email
		})
		.then(async (user) => {
			if (!user) {
				res.send({
					message: 'User not found',
					status: 201
				});
			} else {

				if (user.validPassword(body.password)) {

					user = user.toObject(); // converting to a plain javascript object
					delete user["password"];

					res.send({
						data: user,
						token: Auth.createJWToken({
							userId: user._id
						}),
						status: 200
					})
				} else {
					res.send({
						status: 201,
						message: 'Invalid credentials'
					})
				}
			}
		})
});

router.post('/addStock',CmmValidator.addStock,async function (req, res, next) {

	try {
		let body= req.body;

		userMaster.findOneAndUpdate({_id:body._id},{$inc:{total_stock:body.stock}})
		.then(async (info) => {
			if(info){
				let createHis={
					userid:body._id,
					stock:body.stock
				}
				userStockHis.create(createHis).then(async (his)=>{
					return res.status(200).send({status:200,message:"Stock updated successfully.",data:{}})
				}).catch(async (er)=>{
					await userMaster.findOneAndUpdate({_id:body._id},{$inc:{total_stock:(-(1*body.stock))}})
					return res.status(500).send({status:500,message:"Please try again",data:{}})

				})
				
			}else{
				return res.status(500).send({status:500,message:"Please try again",data:{}})
			}
		})
		.catch((error) => {
			
			return res.status(500).send({status:500,message:error.message,data:{}})

		});
	} catch (err) {

		return res.status(500).send({status:500,message:err.message,data:{}})
	}
	
});




router.post('/webhookResponse',async function (req, res, next) {

	try {
		let body= req.body;
		body=JSON.parse(jsonString);

		if(body.signel=='buy'){
			 let buyRes = await buy(body);
			return res.status(200).send({status:200, message:'Action successfully executed',data:buyRes});

		}else if(body.signel=='sell'){
			let sellRes = await sell(body);
			return res.status(200).send({status:200, message:'Action successfully executed',data:sellRes});

		}else if(body.signel=='hold'){
			let holdRes = await hold(body);
			return res.status(200).send({status:200, message:'Action successfully executed',data:holdRes});

		}else{
			return res.status(409).send({status:409, message:'Invalid action',data:{}});
		
		}
		
	} catch (err) {

		return res.status(500).send({status:500,message:err.message,data:{}})
	}
	
});


async function buy(data){
	try {

		// Integration of buy broker api code here

		return {status:200, message:'Executed'}
		
	} catch (e) {
		return {status:500, message:e.message,data:{}};
	}
}
async function sell(data){
	try {
		// Integration of sell broker api code here
		return {status:200, message:'Executed'}
	} catch (e) {
		return {status:500, message:e.message,data:{}};
	}
}

async function hold(data){
	try {
		// Integration of hold broker api code here
		return {status:200, message:'Executed'}
	} catch (e) {
		return {status:500, message:e.message,data:{}};
	}
}

module.exports = router;