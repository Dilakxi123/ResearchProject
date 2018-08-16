angular.module('roomServices',[])

//Project.create(proData)

.factory('Room', function($http) {
    roomFactory = {};


        //Project.create(proData)
        roomFactory.create = function(proData){
            return $http.post('/roomapi/rooms',proData);
        }
    
        roomFactory.getRooms = function(){
            return $http.get('/roomapi/rooms');
        };
        roomFactory.getRoom= function(id){
            return $http.get('/roomapi/roomEdit/' +id );
        };
        roomFactory.deleteRoom= function(hotelName){
            return $http.delete('/roomapi/room/' + hotelName);
        };
        roomFactory.editRoom= function(id){
            return $http.put('/roomapi/roomEdit/', id);
        };

        roomFactory.getHotels = function(){
            return $http.get('/roomapi/hotellist/');
        };

    return roomFactory;
});
