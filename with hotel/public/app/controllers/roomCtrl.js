angular.module('roomControllers',['roomServices'])

.controller('roomCtrl',function($http,$location,$timeout,Room,$scope) {

    var app99 = this;
    app99.loading = true;
    app99.errorMsg = false;
    app99.limit = 5;
    app99.searchLimit =0;

    var detailsHotels;
    
    $scope.model = []; 
    $scope.data = [ ];

    function getHotels()
    {
        Room.getHotels().then(function(data){
            if(data.data.success){
                detailsHotels = data.data.hotellist;
                //split since linq requires js
                for (var i = 0, len = detailsHotels.length; i < len; i++) {
                    $scope.data.push({id: detailsHotels[i].name, label: detailsHotels[i].name});
                  }
            }else{
            }
        });
    }

    getHotels();



    function getRooms(){
        Room.getRooms().then(function(data){
            if(data.data.success){
                app99.rooms = data.data.rooms;
                app99.loading = false;
                   
            }else{
                app99.errorMsg = data.data.message;
                app99.loading = false;
            }
        });
    }

    getRooms();

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


    app99.deleteRoom = function(hotelName){
        console.log(hotelName);
        Room.deleteRoom(hotelName).then(function(data){
            if(data.data.success) {
                getRooms();
            }else{
                app99.showMoreError = data.data.message;
            }
        });
    };
    


    app99.addRoom = function(proData) {
        app99.loading = true;
        app99.errorMsg = false;
        app99.proData.hotelName = $scope.model;
        
        Room.create(app99.proData).then(function(data){
            data.hotelName = $scope.model;
           if(data.data.success) {
                app99.loading = false;
                app99.successMsg = data.data.message + '......redirecting';
                $timeout(function(){
                    $location.path('/room')
                },2000);
            }else{
                app99.loading = false;
                app99.errorMsg = data.data.message;
            }
        });
    };    
    

})

.controller('roomEditCtrl',function($scope,$routeParams,Room,$timeout){

    var detailsHotels;
    
    $scope.model = []; 
    $scope.data = [ ];

    function getHotels()
    {
        Room.getHotels().then(function(data){
            if(data.data.success){
                detailsHotels = data.data.hotellist;
                //split since linq requires js
                for (var i = 0, len = detailsHotels.length; i < len; i++) {
                    $scope.data.push({id: detailsHotels[i].name, label: detailsHotels[i].name});
                  }
            }else{
            }
        });
    }

    getHotels();

    
    var app99 = this;
    $scope.hotelNameTab = 'active';
    app99.phase1 = true;

    Room.getRoom($routeParams.id).then(function(data){
        if(data.data.success){
            $scope.newHotelName = data.data.room.hotelName;
            $scope.newRoomNo = data.data.room.roomNo;
            $scope.newRoomType = data.data.room.roomType;
            $scope.newRoomPrice = data.data.room.roomPrice;
            app99.currentRoom = data.data.room._id;

            $scope.model =  data.data.room.hotelName;
        }else{
            app99.errorMsg = data.data.message;
        }
    });

    app99.hotelNamePhase = function(){
        $scope.hotelNameTab = 'active';
        $scope.roomNoTab = 'default';
        $scope.roomTypeTab = 'default';
        $scope.roomPriceTab = 'default';
        app99.phase1 = true;
        app99.phase2 = false;
        app99.phase3 = false;
        app99.phase4 = false;
    }
    app99.roomNoPhase = function(){
        $scope.hotelNameTab = 'default';
        $scope.roomNoTab = 'active';
        $scope.roomTypeTab = 'default';
        $scope.roomPriceTab = 'default';
        app99.phase1 = false;
        app99.phase2 = true;
        app99.phase3 = false;
        app99.phase4 = false;
    }
    app99.roomTypePhase = function(){
        $scope.hotelNameTab = 'default';
        $scope.roomNoTab = 'default';
        $scope.roomTypeTab = 'active';
        $scope.roomPriceTab = 'default';
        app99.phase1 = false;
        app99.phase2 = false;
        app99.phase3 = true;
        app99.phase4 = false;
    }
    app99.roomPricePhase = function(){
        $scope.hotelNameTab = 'default';
        $scope.roomNoTab = 'default';
        $scope.roomTypeTab = 'default';
        $scope.roomPriceTab = 'active';
        app99.phase1 = false;
        app99.phase2 = false;
        app99.phase3 = false;
        app99.phase4 = true;
    }
    app99.updateHotelName = function(newHotelName,valid){
        app99.errorMsg = false;
        app99.disabled = true;
        app99.hotelName = $scope.model;
        var roomObject = {};
       
        if(valid){
            roomObject._id = app99.currentRoom;
            roomObject.hotelName = $scope.newHotelName;
            Room.editRoom(roomObject).then(function(data){
                if(data.data.success){
                    app99.successMsg = data.data.message;
                    $timeout(function(){
                        app99.successMsg = false;
                        app99.disabled = false;
                    }, 2000);
                }else{
                    app99.errorMsg = data.data.message;
                    app99.disabled = false;
                }
            });
        }else{
            app99.errorMsg = 'Please ensure form is filled properly';
            app99.disabled = false;
        }
    };
    app99.updateRoomNo = function(newRoomNo,valid){
        app99.errorMsg = false;
        app99.disabled = true;
        var roomObject = {};
       
        if(valid){
            roomObject._id = app99.currentRoom;
            roomObject.roomNo = $scope.newRoomNo;
            Room.editRoom(roomObject).then(function(data){
                if(data.data.success){
                    app99.successMsg = data.data.message;
                    $timeout(function(){
                        app99.successMsg = false;
                        app99.disabled = false;
                    }, 2000);
                }else{
                    app99.errorMsg = data.data.message;
                    app99.disabled = false;
                }
            });
        }else{
            app99.errorMsg = 'Please ensure form is filled properly';
            app99.disabled = false;
        }
    };

    app99.updateRoomType = function(newRoomType,valid){
        app99.errorMsg = false;
        app99.disabled = true;
        var roomObject = {};
       
        if(valid){
            roomObject._id = app99.currentRoom;
            roomObject.roomType = $scope.newRoomType;
            Room.editRoom(roomObject).then(function(data){
                if(data.data.success){
                    app99.successMsg = data.data.message;
                    $timeout(function(){
                        app99.successMsg = false;
                        app99.disabled = false;
                    }, 2000);
                }else{
                    app99.errorMsg = data.data.message;
                    app99.disabled = false;
                }
            });
        }else{
            app99.errorMsg = 'Please ensure form is filled properly';
            app99.disabled = false;
        }
    };

    app99.updateRoomPrice = function(newRoomPrice,valid){
        app99.errorMsg = false;
        app99.disabled = true;
        var roomObject = {};
       
        if(valid){
            roomObject._id = app99.currentRoom;
            roomObject.roomPrice = $scope.newRoomPrice;
            Room.editRoom(roomObject).then(function(data){
                if(data.data.success){
                    app99.successMsg = data.data.message;
                    $timeout(function(){
                        app99.successMsg = false;
                        app99.disabled = false;
                    }, 2000);
                }else{
                    app99.errorMsg = data.data.message;
                    app99.disabled = false;
                }
            });
        }else{
            app99.errorMsg = 'Please ensure form is filled properly';
            app99.disabled = false;
        }
    };


});