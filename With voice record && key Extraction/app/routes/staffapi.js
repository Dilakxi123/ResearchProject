var Staff = require('../models/staff');
var UserModel = require('../models/user');

module.exports = function(prouter){
    
    prouter.post('/staffs',function(req,res){
        var staff = new Staff();
        staff.name = req.body.name;
        staff.username = req.body.username;
        staff.password = req.body.password;
        staff.phoneNo = req.body.phoneNo;
        staff.address = req.body.address;
        staff.email = req.body.email;
        staff.specialize = req.body.specialize;

        
        if(req.body.name == null || req.body.name == '' || req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.specialize == null || req.body.specialize == '' || req.body.phoneNo == null || req.body.phoneNo == ''  || req.body.address == null || req.body.address == '' || req.body.email == null || req.body.email == ''){
            res.json({ success: false, message: 'Ensure staff name,username,password,age,phoneNo,address and email were provided'});
        }else{
            staff.save(function(err) {
                if(err) {
                    if(err.errors != null){
                        if(err.errors.name){
                            res.json({ success: false, message: err.errors.name.message});
                        }else if(err.errors.email){
                            res.json({ success: false, message: err.errors.email.message});
                        }else if(err.errors.username){
                            res.json({ success: false, message: err.errors.username.message});
                        }else if(err.errors.password){
                            res.json({ success: false, message: err.errors.password.message});
                        }else if(err.errors.specialize){
                            res.json({ success: false, message: err.errors.specialize.message});
                        }else if(err.errors.phoneNo){
                            res.json({ success: false, message: err.errors.phoneNo.message});
                        }else if(err.errors.address){
                            res.json({ success: false, message: err.errors.address.message});
                        }else{
                            res.json({ success: false, message: err });
                        }
                    }else if(err) {
                        if(err.code == 11000 ) {
                            res.json({ success: false, message: 'Username or email already exists'});
                        }else{
                            res.json({ success: false, message: err });
                        }
                    }  
                }else {
                    res.json( {success: true, message: 'Staff created'});
                }
            });
          
        }
    
    });



    prouter.get('/staffs',function(req,res){
        Staff.find({}, function(err,staffs){
            if (err) throw err;

            if(!staffs) {
                res.json({ success: false, message: 'Staffs not found'});
            }else{
                res.json({ success: true, staffs: staffs })
            }
        });
    });


    prouter.get('/userlist/',function(req,res){
        UserModel.find({}, function(err,users){
            if (err) throw err;

            if(!users) {
                res.json({ success: false, message: 'Users not found'});
            }else{
                res.json({ success: true, userslist: users })
            }
        });
    });

    prouter.get('/edit/:id',function(req,res){
        var editStaff = req.params.id;
        Staff.findOne({_id:editStaff}, function(err, staff){
            if(err) throw err;
            if(!staff){
                res.json({ success: false, message: 'No Staff found'});
            }else{
                res.json({ success:true, staff: staff });
            }
        });
    });
 
    prouter.delete('/staff/:name',function(req,res){
       var deleteStaff = req.params.name;
        Staff.findOneAndRemove({ name: deleteStaff}, function(err,staff){
            if(err) throw err;
            res.json({ success: true });
        });
    /*   Project.findByIdAndRemove({_id:req.params.id}).then(function(project){
             res.send(project)
           //  don't change postman working
             if (err) throw err;
             res.json({ success: true });
        }); */

    });
 
    prouter.put('/edit/',function(req,res){
        var editStaff = req.body._id  ;
        if(req.body.name) var newName = req.body.name;
        if(req.body.username) var newUsername = req.body.username;
        if(req.body.phoneNo) var newPhoneNo = req.body.phoneNo;
        if(req.body.address) var newAddress = req.body.address;
        if(req.body.email) var newEmail = req.body.email;
        if(req.body.specialize) var newAge = req.body.specialize;
       // Project.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
            //Project.findOne({_id: req.params.id}).then(function(project){
                //don't change postman working
            //  });
        //  });
        if(newName){
            Staff.findOne({ _id: editStaff}, function(err,staff){
                if(err) throw err;
                if(!staff){
                    res.json({ success: false, message: 'No staffs found' });
                }else{
                    staff.name = newName;
                    staff.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.json({ success: true, message: 'Name has been updated'})
                        }
                    });
                }
            });
        }

                if(newUsername){
                    Staff.findOne({ _id: editStaff}, function(err,staff){
                        if(err) throw err;
                        if(!staff){
                            res.json({ success: false, message: 'No staffs found' });
                        }else{
                            staff.username = newUsername;
                            staff.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Username has been updated'})
                                }
                            });
                        }
                    });
                }
                if(newPhoneNo){
                    Staff.findOne({ _id: editStaff}, function(err,staff){
                        if(err) throw err;
                        if(!staff){
                            res.json({ success: false, message: 'No staffs found' });
                        }else{
                            staff.phoneNo = newPhoneNo;
                            staff.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Phone No has been updated'})
                                }
                            });
                        }
                    });
                }
                
                if(newAddress){
                    Staff.findOne({ _id: editStaff}, function(err,staff){
                        if(err) throw err;
                        if(!staff){
                            res.json({ success: false, message: 'No staffs found' });
                        }else{
                            staff.address = newAddress;
                            staff.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Address has been updated'})
                                }
                            });
                        }
                    });
                }

                if(newEmail){
                    Staff.findOne({ _id: editStaff}, function(err,staff){
                        if(err) throw err;
                        if(!staff){
                            res.json({ success: false, message: 'No staffs found' });
                        }else{
                            staff.email = newEmail;
                            staff.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Email has been updated'})
                                }
                            });
                        }
                    });
                }


                if(newSpecialize){
                    Staff.findOne({ _id: editStaff}, function(err,staff){
                        if(err) throw err;
                        if(!staff){
                            res.json({ success: false, message: 'No staffs found' });
                        }else{
                            staff.specialize = newSpecialize;
                            staff.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Specialize has been updated'})
                                }
                            });
                        }
                    });
                }

            });


            return prouter;
        }
         