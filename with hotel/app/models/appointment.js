var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    patientName: {type: String, required: true,unique:true},
    disease: {type: String,  required: true},
    doctorName: {type: String, required: true},
    date: {type: Date, required: true}
  });

module.exports = mongoose.model('Appointment', AppointmentSchema);