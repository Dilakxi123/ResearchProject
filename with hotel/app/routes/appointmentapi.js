var Appointment = require('../models/appointment');
var StaffModel = require('../models/staff');
module.exports = function(arouter){
    
    arouter.post('/appointments',function(req,res){
        var appointment = new Appointment();
        appointment.patientName = req.body.patientName;
        appointment.disease = req.body.disease;
        appointment.doctorName = req.body.doctorName;
        appointment.date = req.body.date;
        
        if(req.body.patientName == null || req.body.patientName == '' || req.body.disease == null || req.body.disease == '' || req.body.doctorName == null || req.body.doctorName == '' || req.body.date == null || req.body.date == ''){
            res.json({ success: false, message: 'Ensure patient name,disease,doctor name,date were provided'});
        }else{
            appointment.save(function(err) {
                if(err){
                    res.json({ success: false, message: 'Appointment already exists'});
                }else{
                    res.send({ success:true, message: 'Appointment created'});
                }
            });
          
        }
    
    });

    arouter.get('/doctorlist/',function(req,res){
        StaffModel.find({}, function(err,appointments){
            if (err) throw err;

            if(!appointments) {
                res.json({ success: false, message: 'Appointments not found'});
            }else{
                res.json({ success: true, doctorlist: appointments })
            }
        });
    });

    arouter.get('/appointments',function(req,res){
        Appointment.find({}, function(err,appointments){
            if (err) throw err;

            if(!appointments) {
                res.json({ success: false, message: 'Appointments not found'});
            }else{
                res.json({ success: true, appointments: appointments })
            }
        });
    });

     arouter.get('/editAppointmentPatient/:id',function(req,res){
         var editAppointment = req.params.id;
         Appointment.findOne({_id:editAppointment}, function(err, appointment){
             if(err) throw err;
             if(!appointment){
                 res.json({ success: false, message: 'No appointment found'});
             }else{
                 res.json({ success:true, appointment: appointment });
             }
         });
     });

     arouter.get('/viewAppointmentPatient',function(req,res){
        var viewAppointment = req.params.id;
        Appointment.findOne({_id:viewAppointment}, function(err, appointment){
            if(err) throw err;
            if(!appointment){
                res.json({ success: false, message: 'No appointment found'});
            }else{
                res.json({ success:true, appointment: appointment });
            }
        });
    });

 
     arouter.delete('/appointment/:patientName',function(req,res){
        var deleteAppointment = req.params.patientName;
         Appointment.findOneAndRemove({ patientName: deleteAppointment}, function(err,appointment){
             if(err) throw err;
             res.json({ success: true });
         });
     });

     arouter.put('/editAppointmentPatient/',function(req,res){
         var editAppointment = req.body._id  ;
         if(req.body.doctorName) var newDoctorName = req.body.doctorName;
         if(req.body.date) var newDate = req.body.date;
                 
                if(newDoctorName){
                     Appointment.findOne({ _id: editAppointment}, function(err,appointment){
                         if(err) throw err;
                         if(!appointment){
                             res.json({ success: false, message: 'No appointments found' });
                         }else{
                             appointment.doctorName = newDoctorName;
                             appointment.save(function(err){
                                 if(err){
                                     console.log(err);
                                 }else{
                                     res.json({ success: true, message: 'Doctor name has been updated'})
                                 }
                             });
                         }
                     });
                 }

                 if(newDate){
                     Appointment.findOne({ _id: editAppointment}, function(err,appointment){
                         if(err) throw err;
                         if(!appointment){
                             res.json({ success: false, message: 'No appointments found' });
                         }else{
                             appointment.date = newDate;
                             appointment.save(function(err){
                                 if(err){
                                     console.log(err);
                                 }else{
                                     res.json({ success: true, message: 'Date has been updated'})
                                 }
                             });
                         }
                     });
                 }

    

             });


            return arouter;
        }
         