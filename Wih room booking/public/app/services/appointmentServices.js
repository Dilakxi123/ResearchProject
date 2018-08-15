angular.module('appointmentServices',[])

.factory('Appointment', function($http) {
    appointmentFactory = {};


    appointmentFactory.create = function(appointmentData){
        return $http.post('/appointmentapi/appointments',appointmentData);
    }

    appointmentFactory.getAppointments = function(){
        return $http.get('/appointmentapi/appointments');
    };
    // taskFactory.getTask= function(id){
    //     return $http.get('/taskapi/editTaskProject/' +id );
    // };
    // taskFactory.deleteTask= function(taskName){
    //     return $http.delete('/taskapi/task/' + taskName);
    // };
    // taskFactory.editTask = function(id){
    //     return $http.put('/taskapi/editTaskProject/', id);
    // };

    appointmentFactory.getStaffs = function(){
        return $http.get('/appointmentapi/doctorlist/');
    };

    return appointmentFactory;
});


