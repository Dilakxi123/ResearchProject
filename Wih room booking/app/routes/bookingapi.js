var Booking =require('../models/booking');


module.exports = function(brouter){

    
    brouter.post('/bookings',function(req,res){
        var booking = new Booking();
        booking.customerName = req.body.customerName;
        booking.hotelName = req.body.hotelName;
        booking.checkIn = req.body.checkIn;
        booking.checkOut = req.body.checkOut;
        booking.roomType = req.body.roomType;


        
        if(req.body.customerName == null || req.body.customerName == '' || req.body.hotelName == null || req.body.hotelName == '' || req.body.checkIn == null || req.body.checkIn == '' || req.body.checkOut == null || req.body.checkOut == '' || req.body.roomType == null || req.body.roomType == ''){
            res.json({ success: false, message: 'Ensure customer Name,hotel Name,checkIn,roomType,age,roomPrice,address and roomPrice were provided'});
        }else{
            booking.save(function(err) {
                if(err) {
                    if(err.errors != null){
                        if(err.errors.customerName){
                            res.json({ success: false, message: err.errors.customerName.message});
                        }else if(err.errors.hotelName){
                            res.json({ success: false, message: err.errors.hotelName.message});
                        }else if(err.errors.checkIn){
                            res.json({ success: false, message: err.errors.checkIn.message});
                        }else if(err.errors.checkOut){
                            res.json({ success: false, message: err.errors.checkOut.message});
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
                    res.json( {success: true, message: 'Booking created'});
                }
            });
          
        }
    
    });



    brouter.get('/bookings',function(req,res){
        Booking.find({}, function(err,bookings){
            if (err) throw err;

            if(!bookings) {
                res.json({ success: false, message: 'bookings not found'});
            }else{
                res.json({ success: true, bookings: bookings })
            }
        });
    });


    return brouter;
}
