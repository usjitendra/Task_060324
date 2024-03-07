const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Kolkata");
const _ = require('lodash');
var crypto = require('crypto');


const userSchema = new Schema({
    username: {
        type: String
    },
    email: { 
      type: String, 
      unique: true, 
      required: true
    },
    total_stock: { 
      type: Number,
      required: true,
      default:0
    },

    password: { type: String },
    api_key: { 
        type: String 
    },
    api_secret: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive'],
        default: 'active' 
    },
    role: {
        type: String,
        enum: ['user', 'guestUser'],
        default: 'user'
    },
    allowLogin: {
        type: Boolean,
        default:true
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
    country: { type: String, default: 'India'}
});

userSchema.pre('save', function(next) {
    this.email = this.email.toLowerCase()
    if (!this.isModified('password')) {
      return next()
    } else {
  
      try {
  
        const SALT_FACTOR = '5' 
        const hash = crypto.pbkdf2Sync(this.password, SALT_FACTOR,  
        1000, 64, `sha512`).toString(`hex`); 
  
        this.password = hash
        next()
  
      }
      catch(err){
        next(err)
      }
    }
  });
  
  userSchema.methods.validPassword = function(password) { 
      var hash = crypto.pbkdf2Sync(password,  
      '5', 1000, 64, `sha512`).toString(`hex`); 
      return this.password === hash; 
  }; 


  userSchema.pre('findOneAndUpdate', function (next) {
    const SALT_FACTOR = '5';

    const password = _.get(this._update, '$set.password', false)
  
    if (password) {
  
      try {
  
        const hash = crypto.pbkdf2Sync(password, SALT_FACTOR,
          1000, 64, `sha512`).toString(`hex`);
  
        this._update.password = hash
        next()
  
      }
      catch (err) {
        next(err)
      }
  
    } else {
      return next()
    }
  
  });


module.exports = mongoose.model('usermaster', userSchema)