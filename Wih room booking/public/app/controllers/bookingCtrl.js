angular.module('bookingControllers',['bookingServices'])

.controller('bookingCtrl',function($http,$location,$timeout,Booking,$scope) {

    var app99 = this;
    app99.loading = true;
    app99.errorMsg = false;
    app99.limit = 5;
    app99.searchLimit =0;

    function getBookings(){
        Booking.getBookings().then(function(data){
            if(data.data.success){
                app99.bookings = data.data.bookings;
                app99.loading = false;
                   
            }else{
                app99.errorMsg = data.data.message;
                app99.loading = false;
            }
        });
    }

    getBookings();

    app99.search = function(searchKeyword, number){
        if(searchKeyword) {
            if(searchKeyword.length > 0){
                app99.limit = 0;
                $scope.searchFilter = searchKeyword;
                app99.limit = number;
            }else{
                $scope.searchFilter = undefined;
                app99.limit = 0;
            }
        }else{
            $scope.searchFilter = undefined;
            app99.limit = 0;
        }
    };

    app99.advanceSearch = function(searchByName){
        if(searchByName){
            $scope.advancedSearchFilter = {};
        }
        if(searchByName){
            $scope.advancedSearchFilter.hotelName = searchByName;
        }
        
        app99.searchLimit = undefined;
    };
    app99.sortOrder = function(order){
        app99.sort = order;
    };

    app99.clear = function(){
        $scope.number = 'Clear';
        app99.limit = 0;
        $scope.searchKeyword =undefined;
        $scope.searchFilter = undefined;
        app99.showMoreError = false;
    };

    app99.showMore = function(number){
        app99.showMoreError = false;
        if(number > 0){
            app99.limit = number;
        }else{
            app99.showMoreError = 'Please enter a valid number';
        }
    };

    app99.showAll = function(){
        app99.limit = undefined;
        app99.showMoreError = false;
    };


    app99.deleteBooking = function(hotelName){
        console.log(hotelName);
        Booking.deleteBooking(hotelName).then(function(data){
            if(data.data.success) {
                getBookings();
            }else{
                app99.showMoreError = data.data.message;
            }
        });
    };
    


    app99.addBooking = function(proData) {
        app99.loading = true;
        app99.errorMsg = false;
        
        Booking.create(app99.proData).then(function(data){
           if(data.data.success) {
                app99.loading = false;
                app99.successMsg = data.data.message + '......redirecting';
                $timeout(function(){
                    $location.path('/booking')
                },2000);
            }else{
                app99.loading = false;
                app99.errorMsg = data.data.message;
            }
        });
    };    
    

});