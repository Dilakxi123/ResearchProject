var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    customerName: {type: String, required: true},
    hotelName: {type: String, required: true},
    checkIn: {type: String,  required: true},
    checkOut: {type: String, required: true},
    roomType: {type: String, required: true}
  });

module.exports = mongoose.model('Booking', BookingSchema);