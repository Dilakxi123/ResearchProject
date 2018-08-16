var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    roomNo: {type: String, required: true},
    roomType: {type: String,  required: true},
    hotelName: {type: String, required: true},
    roomPrice: {type: String, required: true}
  });

module.exports = mongoose.model('Room', RoomSchema);