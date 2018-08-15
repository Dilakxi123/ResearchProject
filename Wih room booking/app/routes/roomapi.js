var Room =require('../models/room');
var HotelModel = require('../models/hotel');


module.exports = function(Rrouter){

    Rrouter.post('/rooms',function(req,res){
        var room = new Room();
        room.hotelName = req.body.hotelName;
        room.roomNo = req.body.roomNo;
        room.roomType = req.body.roomType;
        room.roomPrice = req.body.roomPrice;

        
        if(req.body.hotelName == null || req.body.hotelName == '' || req.body.roomNo == null || req.body.roomNo == '' || req.body.roomType == null || req.body.roomType == '' || req.body.roomPrice == null || req.body.roomPrice == ''){
            res.json({ success: false, message: 'Ensure room name,roomNo,roomType,age,roomPrice,address and roomPrice were provided'});
        }else{
            room.save(function(err) {
                if(err) {
                    if(err.errors != null){
                        if(err.errors.hotelName){
                            res.json({ success: false, message: err.errors.hotelName.message});
                        }else if(err.errors.roomPrice){
                            res.json({ success: false, message: err.errors.roomPrice.message});
                        }else if(err.errors.roomNo){
                            res.json({ success: false, message: err.errors.roomNo.message});
                        }else if(err.errors.roomType){
                            res.json({ success: false, message: err.errors.roomType.message});
                        }else{
                            res.json({ success: false, message: err });
                        }
                    }else if(err) {
                        if(err.code == 11000 ) {
                            res.json({ success: false, message: 'roomNo or email already exists'});
                        }else{
                            res.json({ success: false, message: err });
                        }
                    }  
                }else {
                    res.json( {success: true, message: 'room created'});
                }
            });
          
        }
    
    });



    Rrouter.get('/hotellist/',function(req,res){
        HotelModel.find({}, function(err,hotels){
            if (err) throw err;

            if(!hotels) {
                res.json({ success: false, message: 'Hotels not found'});
            }else{
                res.json({ success: true, hotellist: hotels })
            }
        });
    });

    Rrouter.get('/rooms',function(req,res){
        Room.find({}, function(err,rooms){
            if (err) throw err;

            if(!rooms) {
                res.json({ success: false, message: 'rooms not found'});
            }else{
                res.json({ success: true, rooms: rooms })
            }
        });
    });


    Rrouter.get('/roomEdit/:id',function(req,res){
        var editRoom = req.params.id;
        Room.findOne({_id:editRoom}, function(err, room){
            if(err) throw err;
            if(!room){
                res.json({ success: false, message: 'No room found'});
            }else{
                res.json({ success:true, room: room });
            }
        });
    });
 
    Rrouter.delete('/room/:hotelName',function(req,res){
       var deleteRoom = req.params.hotelName;
        Room.findOneAndRemove({ hotelName: deleteRoom}, function(err,room){
            if(err) throw err;
            res.json({ success: true });
        });

    });
 
    Rrouter.put('/roomEdit/',function(req,res){
        var editRoom = req.body._id  ;
        if(req.body.hotelName) var newHotelName = req.body.hotelName;
        if(req.body.roomNo) var newroomNo = req.body.roomNo;
        if(req.body.roomType) var newRoomType = req.body.roomType;
        if(req.body.roomPrice) var newroomPrice = req.body.roomPrice;

        if(newHotelName){
            Room.findOne({ _id: editRoom}, function(err,room){
                if(err) throw err;
                if(!room){
                    res.json({ success: false, message: 'No rooms found' });
                }else{
                    room.hotelName = newHotelName;
                    room.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.json({ success: true, message: 'HotelName has been updated'})
                        }
                    });
                }
            });
        }

                if(newroomNo){
                    Room.findOne({ _id: editRoom}, function(err,room){
                        if(err) throw err;
                        if(!room){
                            res.json({ success: false, message: 'No rooms found' });
                        }else{
                            room.roomNo = newroomNo;
                            room.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'roomNo has been updated'})
                                }
                            });
                        }
                    });
                }
                if(newroomPrice){
                    Room.findOne({ _id: editRoom}, function(err,room){
                        if(err) throw err;
                        if(!room){
                            res.json({ success: false, message: 'No rooms found' });
                        }else{
                            room.roomPrice = newroomPrice;
                            room.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Room Price has been updated'})
                                }
                            });
                        }
                    });
                }
                
                if(newRoomType){
                    Room.findOne({ _id: editRoom}, function(err,room){
                        if(err) throw err;
                        if(!room){
                            res.json({ success: false, message: 'No rooms found' });
                        }else{
                            room.roomType = newRoomType;
                            room.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Room Type has been updated'})
                                }
                            });
                        }
                    });
                }

            });


    return Rrouter;
}
