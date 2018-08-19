var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HotelSchema = new Schema({
    name: {type: String, required: true,unique:true},
    address: {type: String,  required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    rate: {type: String, required: true},
    roomCount: {type: String, required: true}
  });

module.exports = mongoose.model('Hotel', HotelSchema);