process.env.NODE_ENV = 'test';

// var base = global.appRoot;//process.env.PWD;
var appRoot = require('app-root-path');
var base = appRoot;
var http = require('http');
var config = require(base + '/config'),
    mongoose = require('mongoose'),
    // posts = require(base + '/public/app/controllers/userCtrl');
    Post = require(base + '/app/models/project'),
    Post1 = require(base + '/app/models/task'),
    Post2 = require(base + '/app/models/user'),
    // should = require('should'),
    testUtils = require(base + '/test/utils');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require(appRoot + '/server');

let should = chai.should();

chai.use(chaiHttp);


    describe('/GET Projects', () => {
        it('it should GET all the projects', (done) => {
        //   timeout(15000);            
          chai.request(server)
              .get('/projectapi/projects')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.should.have.property("projects");
                res.body["projects"].should.be.a('array');
                done();
              });
        });
    });

    describe('/POST Project', () => {
        it('it should POST  the project', (done) => {
        //   timeout(15000);  
        let project = {
            team: [{id:"Amma Appa"},{id:"Dila Ganesh"}],
            duedate: "2018-06-18T07:01:47.000Z",
            name:"Management Software12",
            category:"Completed",
            progress:"100%"
        }          
          chai.request(server)
              .post('/projectapi/projects')
              .send(project)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                done();
              });
        });
    });

    describe('/GET Tasks', () => {
        it('it should GET all the tasks', (done) => {
        //   timeout(15000);            
          chai.request(server)
              .get('/taskapi/tasks')
              .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.have.property("success");
                   res.body.should.have.property("tasks");
                done();
              });
        });
    });

    describe('/POST1 Task', () => {
        it('it should POST1  the task', (done) => {
        //   timeout(15000);  
        let task = {
            taskName:"Testing",
            status:"Completed",
            projectName:"Management Software12"
        }          
          chai.request(server)
              .post('/taskapi/tasks')
              .send(task)
              .end((err, res) => {
                   res.should.have.status(200);
                    res.body.should.have.property("success");
                done();
              });
        });
    });


    describe('/GET Users', () => {
        it('it should GET all the users', (done) => {
        //   timeout(15000);            
          chai.request(server)
              .get('/api/users')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.should.have.property("users");
                res.body["users"].should.be.a('array');
                done();
              });
        });
    });

