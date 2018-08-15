var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
    name: {type: String, required: true,unique:true},
    username: {type: String,  required: true},
    password: {type: String, required: true},
    phoneNo: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    specialize: {type: String, required: true}
  });

module.exports = mongoose.model('Staff', StaffSchema);