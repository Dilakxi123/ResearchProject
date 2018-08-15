var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
    message: 'Name must be at least 3 charcters, max 30, no special charcters or numbers, must have space in between name.'
  }),
  validate({
    validator: 'isLength',
    arguments: [3,20],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} charcters'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Is not a valid email.'
  }),
  validate({
    validator: 'isLength',
    arguments: [3,25],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} charcters'
  })
];

var usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,25],
    message: 'Username should be beteen {ARGS[0]} and {ARGS[1]} charcters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Username must contain letters and numbers only'
  })
];

var ageValidator = [
  validate({
    validator: 'isLength',
    arguments: [1,3],
    message: 'Age should be beteen {ARGS[0]} and {ARGS[1]} charcters'
  }),
  validate({
    validator: 'isNumeric',
    message: 'Age must contain numbers only'
  })
];

var phoneNoValidator = [
  validate({
    validator: 'isLength',
    arguments: [10,10],
    message: 'Age should be beteen {ARGS[0]} and {ARGS[1]} charcters'
  }),
  validate({
    validator: 'isNumeric',
    message: 'phone must contain numbers only'
  })
];
var addressValidator = [
  validate({
    validator: 'matches',
    arguments: /^\s*\S+(?:\s+\S+){2}/,
    message: 'Address should have street no & Street name.'
  })
];
var passwordValidator = [
  validate({
    validator: 'matches',
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
    message: 'Password needs to have atleast one lower case, one uppercase, one number, one special character, and must be at least 8 charcters but no more than 35.'
  }),
  validate({
    validator: 'isLength',
    arguments: [8,35],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} charcters'
  })
];


var UserSchema = new Schema({
  name: {type: String, required: true, validate: nameValidator },  
  username: {type: String, lowercase: true, required: true, unique: true, validate: usernameValidator},
  password: {type: String, required: true,passwordValidator},
  age: {type: String, required: true, validate: ageValidator},
  phoneNo: {type: String, required: true, validate: phoneNoValidator},
  address: {type: String, required: true, validate: addressValidator},
  email: {type: String, required: true,lowercase: true, unique: true, validate: emailValidator},
  permission: {type: String, required: true, default: 'user'}
});
UserSchema.pre('save',function(next){
  var user = this;
  bcrypt.hash(user.password,null,null,function(err,hash){
    if(err)return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.plugin(titlize, {
  paths: [ 'name' ]
});
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User',UserSchema);

   