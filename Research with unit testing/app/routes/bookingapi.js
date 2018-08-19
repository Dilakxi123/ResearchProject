var HotelModel = require('../models/hotel');


module.exports = function(brouter){

    brouter.get('/hotellist/',function(req,res){
        HotelModel.find({}, function(err,hotels){
            if (err) throw err;

            if(!hotels) {
                res.json({ success: false, message: 'Hotels not found'});
            }else{
                res.json({ success: true, hotellist: hotels })
            }
        });
    });

    

    return brouter;
}
