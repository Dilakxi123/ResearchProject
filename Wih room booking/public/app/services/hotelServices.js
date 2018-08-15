angular.module('hotelServices',[])

//Project.create(proData)

.factory('Hotel', function($http) {
    hotelFactory = {};


        //Project.create(proData)
        hotelFactory.create = function(proData){
            return $http.post('/hotelapi/hotels',proData);
        }
    
        hotelFactory.getHotels = function(){
            return $http.get('/hotelapi/hotels');
        };
        hotelFactory.getHotel= function(id){
            return $http.get('/hotelapi/hotelEdit/' +id );
        };
        hotelFactory.deleteHotel= function(name){
            return $http.delete('/hotelapi/hotel/' + name);
        };
        hotelFactory.editHotel= function(id){
            return $http.put('/hotelapi/hotelEdit/', id);
        };


    return hotelFactory;
});
