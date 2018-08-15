var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var prouter = express.Router();
var staffRoutes = require('./app/routes/staffapi')(prouter);
var arouter = express.Router();
var appointmentRoutes = require('./app/routes/appointmentapi')(arouter);
var Rrouter = express.Router();
var roomRoutes = require('./app/routes/roomapi')(Rrouter);
var hrouter = express.Router();
var hotelRoutes = require('./app/routes/hotelapi')(hrouter);
var brouter = express.Router();
var bookingRoutes = require('./app/routes/bookingapi')(brouter);
var http = require('http');
var fs = require('fs');

global.appRoot = path.resolve(__dirname);


app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);
app.use('/staffapi',staffRoutes);
app.use('/appointmentapi',appointmentRoutes);
app.use('/roomapi',roomRoutes);
app.use('/hotelapi',hotelRoutes);
app.use('/bookingapi',bookingRoutes);

mongoose.connect('mongodb://localhost:27017/test',function(err){
    if(err){
        console.log('Not connected to the databse: ' + err);
    }else{
        console.log('Successfully connected to MongoDB');
    }
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


fs.readFile(path.join(__dirname + '/public/app/views/pages/appointment.html'), function (err, html) {
    
        if (err) throw err;    
    
        http.createServer(function(request, response) {  
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        });
    });

    const server =  app.listen(port,function(){
        console.log('Running the server on port ' + port);
    });
    

    module.exports = server;


