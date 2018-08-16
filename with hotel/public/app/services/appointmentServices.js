angular.module('appointmentServices',[])

.factory('Appointment', function($http) {
    appointmentFactory = {};


    appointmentFactory.create = function(appointmentData){
        return $http.post('/appointmentapi/appointments',appointmentData);
    }

    appointmentFactory.getAppointments = function(){
        return $http.get('/appointmentapi/appointments');
    };
    appointmentFactory.getAppointment= function(id){
         return $http.get('/appointmentapi/editAppointmentPatient/' +id );
     };
     appointmentFactory.getOneAppointment= function(){
        return $http.get('/appointmentapi/viewAppointmentPatient/' );
    };
    appointmentFactory.deleteAppointment= function(patientName){
         return $http.delete('/appointmentapi/appointment/' + patientName);
     };
     appointmentFactory.editAppointment = function(id){
         return $http.put('/appointmentapi/editAppointmentPatient/', id);
     };

    appointmentFactory.getStaffs = function(){
        return $http.get('/appointmentapi/doctorlist/');
    };

    return appointmentFactory;
});


