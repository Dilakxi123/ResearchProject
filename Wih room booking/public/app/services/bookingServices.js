angular.module('bookingServices',[])

//Project.create(proData)

.factory('Booking', function($http) {
    bookingFactory = {};


        //Project.create(proData)
        bookingFactory.create = function(proData){
            return $http.post('/bookingapi/bookings',proData);
        }
    
        bookingFactory.getBookings = function(){
            return $http.get('/bookingapi/bookings');
        };
        // bookingFactory.getBooking= function(id){
        //     return $http.get('/bookingapi/bookingEdit/' +id );
        // };
        // bookingFactory.deleteBooking= function(hotelName){
        //     return $http.delete('/bookingapi/booking/' + hotelName);
        // };
        // bookingFactory.editBooking= function(id){
        //     return $http.put('/bookingapi/bookingEdit/', id);
        // };

        // bookingFactory.getHotels = function(){
        //     return $http.get('/bookingapi/hotellist/');
        // };

    return bookingFactory;
});
