var Hotel =require('../models/hotel');


module.exports = function(hrouter){

    hrouter.post('/hotels',function(req,res){
        var hotel = new Hotel();
        hotel.name = req.body.name;
        hotel.address = req.body.address;
        hotel.phone = req.body.phone;
        hotel.email = req.body.email;
        hotel.rate = req.body.rate;
        hotel.roomCount = req.body.roomCount;

        
        if(req.body.name == null || req.body.name == '' || req.body.address == null || req.body.address == '' || req.body.phone == null || req.body.phone == '' || req.body.email == null || req.body.email == '' || req.body.rate == null || req.body.rate == '' || req.body.roomCount == null || req.body.roomCount == ''){
            res.json({ success: false, message: 'Ensure hotel name,address,phone,email,rate and roomCount were provided'});
        }else{
            hotel.save(function(err) {
                if(err) {
                    if(err.errors != null){
                        if(err.errors.name){
                            res.json({ success: false, message: err.errors.name.message});
                        }else if(err.errors.email){
                            res.json({ success: false, message: err.errors.email.message});
                        }else if(err.errors.address){
                            res.json({ success: false, message: err.errors.address.message});
                        }else if(err.errors.phone){
                            res.json({ success: false, message: err.errors.phone.message});
                        }else if(err.errors.rate){
                            res.json({ success: false, message: err.errors.rate.message});
                        }else if(err.errors.roomCount){
                            res.json({ success: false, message: err.errors.roomCount.message});
                        }else{
                            res.json({ success: false, message: err });
                        }
                    }else if(err) {
                        if(err.code == 11000 ) {
                            res.json({ success: false, message: 'address or email already exists'});
                        }else{
                            res.json({ success: false, message: err });
                        }
                    }  
                }else {
                    res.json( {success: true, message: 'hotel created'});
                }
            });
          
        }
    
    });



    hrouter.get('/hotels',function(req,res){
        Hotel.find({}, function(err,hotels){
            if (err) throw err;

            if(!hotels) {
                res.json({ success: false, message: 'hotels not found'});
            }else{
                res.json({ success: true, hotels: hotels })
            }
        });
    });


    hrouter.get('/hotelEdit/:id',function(req,res){
        var editHotel = req.params.id;
        Hotel.findOne({_id:editHotel}, function(err, hotel){
            if(err) throw err;
            if(!hotel){
                res.json({ success: false, message: 'No hotel found'});
            }else{
                res.json({ success:true, hotel: hotel });
            }
        });
    });
 
    hrouter.delete('/hotel/:name',function(req,res){
       var deleteHotel = req.params.name;
        Hotel.findOneAndRemove({ name: deleteHotel}, function(err,hotel){
            if(err) throw err;
            res.json({ success: true });
        });

    });
 
    hrouter.put('/hotelEdit/',function(req,res){
        var editHotel = req.body._id  ;
        if(req.body.name) var newName = req.body.name;
        if(req.body.address) var newAddress = req.body.address;
        if(req.body.phone) var newPhone = req.body.phone;
        if(req.body.email) var newEmail = req.body.email;
        if(req.body.rate) var newRate = req.body.rate;
        if(req.body.roomCount) var newRoomCount = req.body.roomCount;


        if(newName){
            Hotel.findOne({ _id: editHotel}, function(err,hotel){
                if(err) throw err;
                if(!hotel){
                    res.json({ success: false, message: 'No hotels found' });
                }else{
                    hotel.name = newName;
                    hotel.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.json({ success: true, message: 'HotelName has been updated'})
                        }
                    });
                }
            });
        }

                if(newAddress){
                    Hotel.findOne({ _id: editHotel}, function(err,hotel){
                        if(err) throw err;
                        if(!hotel){
                            res.json({ success: false, message: 'No hotels found' });
                        }else{
                            hotel.address = newAddress;
                            hotel.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'address has been updated'})
                                }
                            });
                        }
                    });
                }
                if(newEmail){
                    Htel.findOne({ _id: editHotel}, function(err,hotel){
                        if(err) throw err;
                        if(!hotel){
                            res.json({ success: false, message: 'No hotels found' });
                        }else{
                            hotel.email = newEmail;
                            hotel.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Phone No has been updated'})
                                }
                            });
                        }
                    });
                }
                
                if(newPhone){
                    Hotel.findOne({ _id: editHotel}, function(err,hotel){
                        if(err) throw err;
                        if(!hotel){
                            res.json({ success: false, message: 'No hotels found' });
                        }else{
                            hotel.phone = newPhone;
                            hotel.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Hotel Type has been updated'})
                                }
                            });
                        }
                    });
                }

                if(newRate){
                    Hotel.findOne({ _id: editHotel}, function(err,hotel){
                        if(err) throw err;
                        if(!hotel){
                            res.json({ success: false, message: 'No hotels found' });
                        }else{
                            hotel.rate = newRate;
                            hotel.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Rate has been updated'})
                                }
                            });
                        }
                    });
                }
                if(newRoomCount){
                    Hotel.findOne({ _id: editHotel}, function(err,hotel){
                        if(err) throw err;
                        if(!hotel){
                            res.json({ success: false, message: 'No hotels found' });
                        }else{
                            hotel.roomCount = newRoomCount;
                            hotel.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    res.json({ success: true, message: 'Room Count has been updated'})
                                }
                            });
                        }
                    });
                }

            });


    return hrouter;
}
