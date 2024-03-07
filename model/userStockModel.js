const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");
const _ = require('lodash');
var crypto = require('crypto');


const userStockSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId
    },
   
    stock: { 
      type: Number,
      required: true,
      default:0
    },

    action: { 
        type: String, 
        enum: ['buy', 'sell'],
        default: 'buy' 
    },
    role: {
        type: String,
        enum: ['user'],
        default: 'user'
    },
   
    updatedAt: { 
        type: Number, 
        default: () => moment().valueOf() 
    },
    createdAt: { 
        type: Number, 
        default: () => moment().valueOf() 
    },
    timezone : {
        type: String,
        default: function () {
            return this.country == "India" ? 'Asia/Kolkata' : 'Asia/Bangkok';
        }
    },
});


  



module.exports = mongoose.model('userstockhistory', userStockSchema)