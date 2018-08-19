angular.module('bookingServices',[])

//Project.create(proData)

.factory('Booking', function($http) {
    bookingFactory = {};


        bookingFactory.getHotels = function(){
            return $http.get('/bookingapi/hotellist/');
        };

    return bookingFactory;
});
