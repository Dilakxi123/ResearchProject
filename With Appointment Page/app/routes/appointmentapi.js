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

    // arouter.get('/editTaskProject/:id',function(req,res){
    //     var editTask = req.params.id;
    //     Task.findOne({_id:editTask}, function(err, task){
    //         if(err) throw err;
    //         if(!task){
    //             res.json({ success: false, message: 'No Task found'});
    //         }else{
    //             res.json({ success:true, task: task });
    //         }
    //     });
    // });
 
    // arouter.delete('/task/:taskName',function(req,res){
    //    var deleteTask = req.params.taskName;
    //     Task.findOneAndRemove({ taskName: deleteTask}, function(err,task){
    //         if(err) throw err;
    //         res.json({ success: true });
    //     });
    // });

    // arouter.put('/editTaskProject/',function(req,res){
    //     var editTask = req.body._id  ;
    //     if(req.body.taskName) var newTaskName = req.body.taskName;
    //     if(req.body.status) var newStatus = req.body.status;
    //     if(req.body.projectName) var newProjectName = req.body.projectName;

    //             if(newTaskName){
    //                 Task.findOne({ _id: editTask}, function(err,task){
    //                     if(err) throw err;
    //                     if(!task){
    //                         res.json({ success: false, message: 'No tasks found' });
    //                     }else{
    //                         task.taskName = newTaskName;
    //                         task.save(function(err){
    //                             if(err){
    //                                 console.log(err);
    //                             }else{
    //                                 res.json({ success: true, message: 'Task name has been updated'})
    //                             }
    //                         });
    //                     }
    //                 });
    //             }

    //             if(newStatus){
    //                 Task.findOne({ _id: editTask}, function(err,task){
    //                     if(err) throw err;
    //                     if(!task){
    //                         res.json({ success: false, message: 'No tasks found' });
    //                     }else{
    //                         task.status = newStatus;
    //                         task.save(function(err){
    //                             if(err){
    //                                 console.log(err);
    //                             }else{
    //                                 res.json({ success: true, message: 'Status has been updated'})
    //                             }
    //                         });
    //                     }
    //                 });
    //             }

    //             if(newProjectName){
    //                 Task.findOne({ _id: editTask}, function(err,task){
    //                     if(err) throw err;
    //                     if(!task){
    //                         res.json({ success: false, message: 'No tasks found' });
    //                     }else{
    //                         task.projectName = newProjectName;
    //                         task.save(function(err){
    //                             if(err){
    //                                 console.log(err);
    //                             }else{
    //                                 res.json({ success: true, message: 'Project Name has been updated'})
    //                             }
    //                         });
    //                     }
    //                 });
    //             }


    //         });


            return arouter;
        }
         