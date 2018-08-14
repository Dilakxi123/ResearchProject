angular.module('staffServices',[])

//Project.create(proData)

.factory('Staff', function($http) {
    staffFactory = {};

    //Project.create(proData)
    staffFactory.create = function(proData){
        return $http.post('/staffapi/staffs',proData);
    }

    staffFactory.getStaffs = function(){
        return $http.get('/staffapi/staffs');
    };
    staffFactory.getStaff= function(id){
        return $http.get('/staffapi/edit/' +id );
    };
    staffFactory.deleteStaff= function(name){
        return $http.delete('/staffapi/staff/' + name);
    };
    staffFactory.editStaff= function(id){
        return $http.put('/staffapi/edit/', id);
    };


    staffFactory.getUsers = function(){
        return $http.get('/staffapi/userlist/');
    };

    return staffFactory;
});


