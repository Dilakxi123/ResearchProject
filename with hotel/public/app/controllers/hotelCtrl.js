angular.module('hotelControllers',['hotelServices'])

.controller('hotelCtrl',function($http,$location,$timeout,Hotel,$scope) {

    var app45 = this;
    app45.loading = true;
    app45.errorMsg = false;
    app45.limit = 5;
    app45.searchLimit =0;

    

    function getHotels(){
        Hotel.getHotels().then(function(data){
            if(data.data.success){
                app45.hotels = data.data.hotels;
                app45.loading = false;
                   
            }else{
                app45.errorMsg = data.data.message;
                app45.loading = false;
            }
        });
    }

    getHotels();

    app45.search = function(searchKeyword, number){
        if(searchKeyword) {
            if(searchKeyword.length > 0){
                app45.limit = 0;
                $scope.searchFilter = searchKeyword;
                app45.limit = number;
            }else{
                $scope.searchFilter = undefined;
                app45.limit = 0;
            }
        }else{
            $scope.searchFilter = undefined;
            app45.limit = 0;
        }
    };

    app45.advanceSearch = function(searchByName){
        if(searchByName){
            $scope.advancedSearchFilter = {};
        }
        if(searchByName){
            $scope.advancedSearchFilter.name = searchByName;
        }
        
        app45.searchLimit = undefined;
    };
    app45.sortOrder = function(order){
        app45.sort = order;
    };

    app45.clear = function(){
        $scope.number = 'Clear';
        app45.limit = 0;
        $scope.searchKeyword =undefined;
        $scope.searchFilter = undefined;
        app45.showMoreError = false;
    };

    app45.showMore = function(number){
        app45.showMoreError = false;
        if(number > 0){
            app45.limit = number;
        }else{
            app45.showMoreError = 'Please enter a valid number';
        }
    };

    app45.showAll = function(){
        app45.limit = undefined;
        app45.showMoreError = false;
    };


    app45.deleteHotel = function(name){
        console.log(name);
        Hotel.deleteHotel(name).then(function(data){
            if(data.data.success) {
                getHotels();
            }else{
                app45.showMoreError = data.data.message;
            }
        });
    };
    


    app45.addHotel = function(proData) {
        app45.loading = true;
        app45.errorMsg = false;
        Hotel.create(app45.proData).then(function(data){
           if(data.data.success) {
                app45.loading = false;
                app45.successMsg = data.data.message + '......redirecting';
                $timeout(function(){
                    $location.path('/hotel')
                },2000);
            }else{
                app45.loading = false;
                app45.errorMsg = data.data.message;
            }
        });
    };    
    

})

.controller('hotelEditCtrl',function($scope,$routeParams,Hotel,$timeout){
    
    var app45 = this;
    $scope.nameTab = 'active';
    app45.phase1 = true;

    Hotel.getHotel($routeParams.id).then(function(data){
        if(data.data.success){
            $scope.newName = data.data.hotel.name;
            $scope.newAddress = data.data.hotel.address;
            $scope.newPhone = data.data.hotel.phone;
            $scope.newEmail = data.data.hotel.email;
            $scope.newRate = data.data.hotel.rate;
            $scope.newRoomCount = data.data.hotel.roomCount;
            app45.currentHotel = data.data.hotel._id;
        }else{
            app45.errorMsg = data.data.message;
        }
    });

    app45.namePhase = function(){
        $scope.nameTab = 'active';
        $scope.addressTab = 'default';
        $scope.phoneTab = 'default';
        $scope.emailTab = 'default';
        $scope.rateTab = 'default';
        $scope.roomCountTab = 'default';
        app45.phase1 = true;
        app45.phase2 = false;
        app45.phase3 = false;
        app45.phase4 = false;
        app45.phase5 = false;
        app45.phase6 = false;
    }
    app45.addressPhase = function(){
        $scope.nameTab = 'default';
        $scope.addressTab = 'active';
        $scope.phoneTab = 'default';
        $scope.emailTab = 'default';
        $scope.rateTab = 'default';
        $scope.roomCountTab = 'default';
        app45.phase1 = false;
        app45.phase2 = true;
        app45.phase3 = false;
        app45.phase4 = false;
        app45.phase5 = false;
        app45.phase6 = false;
    }
    app45.phonePhase = function(){
        $scope.nameTab = 'default';
        $scope.addressTab = 'default';
        $scope.phoneTab = 'active';
        $scope.emailTab = 'default';
        $scope.rateTab = 'default';
        $scope.roomCountTab = 'default';
        app45.phase1 = false;
        app45.phase2 = false;
        app45.phase3 = true;
        app45.phase4 = false;
        app45.phase5 = false;
        app45.phase6 = false;
    }
    app45.emailPhase = function(){
        $scope.nameTab = 'default';
        $scope.addressTab = 'default';
        $scope.phoneTab = 'default';
        $scope.emailTab = 'active';
        $scope.rateTab = 'default';
        $scope.roomCountTab = 'default';
        app45.phase1 = false;
        app45.phase2 = false;
        app45.phase3 = false;
        app45.phase4 = true;
        app45.phase5 = false;
        app45.phase6 = false;
    }
    app45.ratePhase = function(){
        $scope.nameTab = 'default';
        $scope.addressTab = 'default';
        $scope.phoneTab = 'default';
        $scope.emailTab = 'default';
        $scope.rateTab = 'active';
        $scope.roomCountTab = 'default';
        app45.phase1 = false;
        app45.phase2 = false;
        app45.phase3 = false;
        app45.phase4 = false;
        app45.phase5 = true;
        app45.phase6 = false;
    }
    app45.roomCountPhase = function(){
        $scope.nameTab = 'default';
        $scope.addressTab = 'default';
        $scope.phoneTab = 'default';
        $scope.emailTab = 'default';
        $scope.rateTab = 'default';
        $scope.roomCountTab = 'active';
        app45.phase1 = false;
        app45.phase2 = false;
        app45.phase3 = false;
        app45.phase4 = false;
        app45.phase5 = false;
        app45.phase6 = true;
    }
    app45.updateName = function(newName,valid){
        app45.errorMsg = false;
        app45.disabled = true;
        var hotelObject = {};
       
        if(valid){
            hotelObject._id = app45.currentHotel;
            hotelObject.name = $scope.newName;
            Hotel.editHotel(hotelObject).then(function(data){
                if(data.data.success){
                    app45.successMsg = data.data.message;
                    $timeout(function(){
                        app45.successMsg = false;
                        app45.disabled = false;
                    }, 2000);
                }else{
                    app45.errorMsg = data.data.message;
                    app45.disabled = false;
                }
            });
        }else{
            app45.errorMsg = 'Please ensure form is filled properly';
            app45.disabled = false;
        }
    };
    app45.updateAddress = function(newAddress,valid){
        app45.errorMsg = false;
        app45.disabled = true;
        var hotelObject = {};
       
        if(valid){
            hotelObject._id = app45.currentHotel;
            hotelObject.address = $scope.newAddress;
            Hotel.editHotel(hotelObject).then(function(data){
                if(data.data.success){
                    app45.successMsg = data.data.message;
                    $timeout(function(){
                        app45.successMsg = false;
                        app45.disabled = false;
                    }, 2000);
                }else{
                    app45.errorMsg = data.data.message;
                    app45.disabled = false;
                }
            });
        }else{
            app45.errorMsg = 'Please ensure form is filled properly';
            app45.disabled = false;
        }
    };

    app45.updatePhone = function(newPhone,valid){
        app45.errorMsg = false;
        app45.disabled = true;
        var hotelObject = {};
       
        if(valid){
            hotelObject._id = app45.currentHotel;
            hotelObject.phone = $scope.newPhone;
            Hotel.editHotel(hotelObject).then(function(data){
                if(data.data.success){
                    app45.successMsg = data.data.message;
                    $timeout(function(){
                        app45.successMsg = false;
                        app45.disabled = false;
                    }, 2000);
                }else{
                    app45.errorMsg = data.data.message;
                    app45.disabled = false;
                }
            });
        }else{
            app45.errorMsg = 'Please ensure form is filled properly';
            app45.disabled = false;
        }
    };
    app45.updateEmail = function(newEmail,valid){
        app45.errorMsg = false;
        app45.disabled = true;
        var hotelObject = {};
       
        if(valid){
            hotelObject._id = app45.currentHotel;
            hotelObject.email = $scope.newEmail;
            Hotel.editHotel(hotelObject).then(function(data){
                if(data.data.success){
                    app45.successMsg = data.data.message;
                    $timeout(function(){
                        app45.successMsg = false;
                        app45.disabled = false;
                    }, 2000);
                }else{
                    app45.errorMsg = data.data.message;
                    app45.disabled = false;
                }
            });
        }else{
            app45.errorMsg = 'Please ensure form is filled properly';
            app45.disabled = false;
        }
    };

    app45.updateRate = function(newRate,valid){
        app45.errorMsg = false;
        app45.disabled = true;
        var hotelObject = {};
       
        if(valid){
            hotelObject._id = app45.currentHotel;
            hotelObject.rate = $scope.newRate;
            Hotel.editHotel(hotelObject).then(function(data){
                if(data.data.success){
                    app45.successMsg = data.data.message;
                    $timeout(function(){
                        app45.successMsg = false;
                        app45.disabled = false;
                    }, 2000);
                }else{
                    app45.errorMsg = data.data.message;
                    app45.disabled = false;
                }
            });
        }else{
            app45.errorMsg = 'Please ensure form is filled properly';
            app45.disabled = false;
        }
    };

    app45.updateRoomCount = function(newRoomCount,valid){
        app45.errorMsg = false;
        app45.disabled = true;
        var hotelObject = {};
       
        if(valid){
            hotelObject._id = app45.currentHotel;
            hotelObject.roomCount = $scope.newRoomCount;
            Hotel.editHotel(hotelObject).then(function(data){
                if(data.data.success){
                    app45.successMsg = data.data.message;
                    $timeout(function(){
                        app45.successMsg = false;
                        app45.disabled = false;
                    }, 2000);
                }else{
                    app45.errorMsg = data.data.message;
                    app45.disabled = false;
                }
            });
        }else{
            app45.errorMsg = 'Please ensure form is filled properly';
            app45.disabled = false;
        }
    };

});