const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

function login(req, res, next) {
    const data = req.body;

    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    const { error, value } = schema.validate(data);

    if (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    } else {
            next()
    }
}



function signup(req, res, next) {

    const data = req.body;

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        api_key: Joi.string().required(),
        api_secret: Joi.string().required(),
        //role: Joi.string().valid("user").required()
    });

    const { error, value } = schema.validate(data);

    if (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    } else {
            next()
    }

   
}


function addStock(req, res, next) {

    const data = req.body;

    const schema = Joi.object({
        _id: JoiObjectId().required(),
        stock: Joi.number().required(),
        action: Joi.string().valid('buy','sell').required()
    });

    const { error, value } = schema.validate(data);

    if (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    } else {
            next()
    }

   
}



module.exports = {

    "login": login,
    "signup": signup,
    "addStock":addStock
  
   
}