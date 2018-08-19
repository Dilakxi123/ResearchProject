var User =require('../models/user');
var jwt  =require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function(router){
    //USER REGISTRATION ROUTE
    //http://localhost:8080/api/users
    router.get('/users', function(req, res){
        User.find({}, function(err,users){
            if(err) throw err;
            if(!users) {
                res.json({ success: false, message: 'Users not found' });
            }else{
                res.json({ success: true, users: users });
            }
        });
    });
    router.post('/users',function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.name = req.body.name;
        user.age = req.body.age;
        user.phoneNo = req.body.phoneNo;
        user.address = req.body.address;
        if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''  || req.body.name == null || req.body.name == '' || req.body.age == null || req.body.age == '' || req.body.phoneNo == null || req.body.phoneNo == '' || req.body.address == null || req.body.address == ''){
            res.json({ success: false, message: 'Ensure username,email,age,phoneNo,address and password were provided' });
        }else{
            user.save(function(err) {
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
                        }else if(err.errors.age){
                            res.json({ success: false, message: err.errors.age.message});
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
                    res.json( {success: true, message: 'user created'});
                }
            });
        }
    });


    router.post('/checkusername',function(req, res) {
        User.findOne({ username: req.body.username}).select('username').exec(function(err,user){
            if(err) throw err;
            if(user){
                res.json({ success: false, message: 'That username is already taken '});
            }else{
                res.json({ success: true, message: 'Valid username '});
            }
        });
    }); 

    router.post('/checkemail',function(req, res) {
        User.findOne({ email: req.body.email}).select('email').exec(function(err,user){
            if(err) throw err;
            if(user){
                res.json({ success: false, message: 'That email is already taken '});
            }else{
                res.json({ success: true, message: 'Valid email '});
            }
        });
    });


    //USER LOGIN ROUTE
    //http://localhost:port/api/authenicate
    router.post('/authenticate',function(req, res) {
        User.findOne({ username: req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;

            if(!user) {
                res.json({ success:false, message: 'Could not authenticate user' });
            }else if(user) {
                    if(req.body.password){
                        var validPassword = user.comparePassword(req.body.password);
                    }else{
                        res.json({ success: false, message: 'No password provided' });
                    }   
                if(!validPassword){
                    res.json({ success: false, message: 'Could not authenticate password' });
                }else{
                    var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h'} );
                    res.json({ success: true, message: 'User authenticated!', token: token });
                }
            }
        });
    }); 

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            //verify token
            jwt.verify(token, secret, function(err, decoded){
                if(err) {
                    res.json({ success:false, message: 'Token invalid'});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            res.json({ success: false, message: 'No token provided' });
        }
    });
    router.post('/me', function(req, res){
        res.send(req.decoded);
    });

    router.get('/permission',function(req,res) {
        User.findOne({ username: req.decoded.username}, function(err,user){
            if(err) throw err;
            if(!user) {
                res.json({ success: false, message: 'No user was found'});
            }else {
                 res.json({ success: true, permission: user.permission });
            }
        });
    });

    router.get('/management',function(req,res) {
        User.find({}, function(err, users) {
            if(err) throw err;
            User.findOne({ username: req.decoded.username} , function (err, mainUser) {
                if(err) throw err;
                if(!mainUser) {
                    res.json ({ success: false, message: 'No User Found'});
                }else{
                     if(mainUser.permission === 'admin' || mainUser.permission === 'user'){
                        if(!users) {
                            res.json({ success:false, message: 'Users not found'});
                        }else{
                            res.json({ success: true, users:users, permission: mainUser.permission});
                        }
                     }else {
                        res.json({ success: false, message: 'Insufficent permission'});
                    }
                }
            });
        });
    });


    router.delete('/management/:username', function(req,res) {
        var deletedUser = req.params.username;
        User.findOne({ username: req.decoded.username }, function(err,mainUser) {
            if(err) throw err;
            if(!mainUser) {
                res.json({ success: false, message: 'No User found'});
            }else {
                if(mainUser.permission !== 'admin') {
                    res.json({ success: false, message:'Insufficient Permission'});
                }else{
                    User.findOneAndRemove({ username: deletedUser}, function(err,user) {
                        if(err) throw err;
                        res.json({ success: true });
                    });
                }
            }
        })
        
    });

    router.get('/userEdit/:id', function(req,res) {
        var editUser= req.params.id;
        User.findOne({ username: req.decoded.username} , function(err,mainUser) {
            if(err) throw err;
            if(!mainUser) {
                res.json({ success: false, message: 'No User Found'});
            }else{
                if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                    User.findOne({ _id: editUser}, function(err,user){
                        if(err) throw err;
                        if(!user) {
                            res.json({ success: false, message: 'No User found'});
                        }else{
                            res.json({ success: true, user: user });
                        }
                    });
                }else {
                    res.json({ success: false, message: 'Insufficient Permission'})
                }
            }
        });
    });

    router.put('/userEdit/',function(req,res) {
        var editUser = req.body._id;
        if(req.body.name) var newName = req.body.name;
        if(req.body.username) var newUsername = req.body.username;
        if(req.body.email) var newEmail = req.body.email;
        if(req.body.age) var newAge = req.body.age;
        if(req.body.phoneNo) var newPhoneNo = req.body.phoneNo;
        if(req.body.address) var newAddress = req.body.address;
        if(req.body.permission) var newPermission = req.body.permission;
        User.findOne ({ username: req.decoded.username }, function(err,mainUser){
            if(err) throw err;
            if(!mainUser) {
                res.json({ success: false, message:'No user found' });
            }else{
                if(newName) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{
                                user.name = newName;
                                user.save(function(err) {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.json({ success: true, message: 'Name has been updated'});
                                    } 
                                });
                            }
                        })
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }
                if(newUsername) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{
                                user.username = newUsername;
                                user.save(function(err) {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.json({ success: true, message: 'Username has been updated'});
                                    } 
                                });
                            }
                        })
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }
                if(newEmail) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{
                                user.email = newEmail;
                                user.save(function(err) {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.json({ success: true, message: 'Email has been updated'});
                                    } 
                                });
                            }
                        })
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }

                if(newAge) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{
                                user.age = newAge;
                                user.save(function(err) {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.json({ success: true, message: 'Age has been updated'});
                                    } 
                                });
                            }
                        })
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }

                if(newPhoneNo) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{
                                user.phoneNo = newPhoneNo;
                                user.save(function(err) {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.json({ success: true, message: 'PhoneNo has been updated'});
                                    } 
                                });
                            }
                        })
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }
                if(newAddress) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user') {
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{
                                user.address = newAddress;
                                user.save(function(err) {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.json({ success: true, message: 'Address has been updated'});
                                    } 
                                });
                            }
                        })
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }

                if(newPermission) {
                    if(mainUser.permission === 'admin' || mainUser.permission === 'user'){
                        User.findOne({ _id: editUser}, function(err,user) {
                            if(err) throw err;
                            if(!user) {
                                res.json({ success: false, message: 'No user found'});
                            }else{

                                if(newPermission === 'user') {
                                    if(user.permission === 'admin') {
                                        if(mainUser.permission !== 'admin') {
                                            res.json({ success: false, message: 'Insuficient permission.. you must be an admin to degrade!!'});
                                        }else{
                                            user.permission =newPermission;
                                            user.save(function(err){
                                                if(err) {
                                                    console.log(err);
                                                }else {
                                                    res.json({ success: true, message: 'Permission has been updated'});
                                                }
                                            });
                                        }
                                    }else{
                                        user.permission =newPermission;
                                        user.save(function(err){
                                            if(err) {
                                                console.log(err);
                                            }else {
                                                res.json({ success: true, message: 'Permission has been updated'});
                                            }
                                        });
                                    }
                                }

                                if(newPermission === 'user') {
                                    if(user.permission === 'admin') {
                                        if(mainUser.permission !== 'admin') {
                                            res.json({ success: false, message: 'Insuficient permission.. you must be an admin to degrade!!'});
                                        }else{
                                            user.permission =newPermission;
                                            user.save(function(err){
                                                if(err) {
                                                    console.log(err);
                                                }else {
                                                    res.json({ success: true, message: 'Permission has been updated'});
                                                }
                                            });
                                        }
                                    }else{
                                        user.permission =newPermission;
                                        user.save(function(err){
                                            if(err) {
                                                console.log(err);
                                            }else {
                                                res.json({ success: true, message: 'Permission has been updated'});
                                            }
                                        });
                                    }
                                }

                                if(newPermission  === 'admin') {
                                    if(mainUser.permission === 'admin') {
                                        user.permission =newPermission;
                                        user.save(function(err){
                                            if(err) {
                                                console.log(err);
                                            }else {
                                                res.json({ success: true, message: 'Permission has been updated'});
                                            }
                                        });
                                    }else{
                                        res.json({ success: false, message: 'Insuficient permission.. you must be an admin to degrade!!'});
                                    }
                                }
                            }
                        });
                    }else{
                        res.json({ success: false, message: 'Insufficient Permission'});
                    }
                }

            }
        });
    
    });

    return router;
}
