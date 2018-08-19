process.env.NODE_ENV = 'test';

// var base = global.appRoot;//process.env.PWD;
var appRoot = require('app-root-path');
var base = appRoot;
var http = require('http');
var config = require(base + '/config'),
    mongoose = require('mongoose'),
    // posts = require(base + '/public/app/controllers/userCtrl');
    Post = require(base + '/app/models/appointment')
    // should = require('should'),
    testUtils = require(base + '/test/utils');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require(appRoot + '/server');

let should = chai.should();

chai.use(chaiHttp);


    describe('/GET Appointment', () => {
        it('it should GET all the appointments', (done) => {
        //   timeout(15000);            
          chai.request(server)
              .get('/appointmentapi/appointments')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.should.have.property("appointments");
                res.body["appointments"].should.be.a('array');
                done();
              });
        });
    });

    describe('/POST Appointment', () => {
        it('it should POST  the appointments', (done) => {
        //   timeout(15000);  
        let appointment = {
            patientName:"Nizam",
            disease:"Management Software12",
            doctorName:"Completed",
            date: "2018-06-18T07:01:47.000Z"
        }          
          chai.request(server)
              .post('/appointmentapi/appointments')
              .send(appointment)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                done();
              });
        });
    });


    describe('/PUT Hotel', () => {
        it('it should PUT the hotel', (done) => {
        //   timeout(15000);            
          chai.request(server)
              .put('/hotelapi/hotelEdit/')
              .send({
                '_id':'5b6a7f4ffd4f0509c4419b46',
                'name':'Singapore'
                })
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property("success");
                 done();
              });
        });
    });

    describe('/DELETE Hotel', () => {
        it('it should DELETE  the hotel', (done) => {
        //   timeout(15000);          
          chai.request(server)
              .delete('/hotelapi/hotel/status')
              .end(function(err, res) {
                   res.should.have.status(200);
                   res.should.be.json;
                    res.body.should.have.property("success");
                done();
              });
        });
    });


    
