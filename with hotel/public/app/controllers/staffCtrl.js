
angular.module('staffController',['staffServices','720kb.datepicker','angularjs-dropdown-multiselect'])
.controller('staffCtrl',function($http,$location,$timeout,Staff,$scope){

    var app1 = this;
    app1.loading = true;
    app1.errorMsg = false;
    app1.limit = 5;
    app1.searchLimit =0;

  /*  $http({
        method: 'get',
        url: 'http://localhost:8080/api/users'
      }).success(function(posts) {
        console.log(posts);
        $scope.name = posts;
      })*/
    

    function getStaffs(){
        Staff.getStaffs().then(function(data){
            if(data.data.success){
                app1.staffs = data.data.staffs;
                app1.loading = false;
                   
            }else{
                app1.errorMsg = data.data.message;
                app1.loading = false;
            }
        });
    }

    getStaffs();

    app1.search = function(searchKeyword, number){
        if(searchKeyword) {
            if(searchKeyword.length > 0){
                app1.limit = 0;
                $scope.searchFilter = searchKeyword;
                app1.limit = number;
            }else{
                $scope.searchFilter = undefined;
                app1.limit = 0;
            }
        }else{
            $scope.searchFilter = undefined;
            app1.limit = 0;
        }
    };

    app1.advanceSearch = function(searchByName){
        if(searchByName){
            $scope.advancedSearchFilter = {};
        }
        if(searchByName){
            $scope.advancedSearchFilter.name = searchByName;
        }
        
        app1.searchLimit = undefined;
    };
    app1.sortOrder = function(order){
        app1.sort = order;
    };

    app1.clear = function(){
        $scope.number = 'Clear';
        app1.limit = 0;
        $scope.searchKeyword =undefined;
        $scope.searchFilter = undefined;
        app1.showMoreError = false;
    };

    app1.showMore = function(number){
        app1.showMoreError = false;
        if(number > 0){
            app1.limit = number;
        }else{
            app1.showMoreError = 'Please enter a valid number';
        }
    };

    app1.showAll = function(){
        app1.limit = undefined;
        app1.showMoreError = false;
    };


    app1.deleteStaff = function(name){
        console.log(name);
        Staff.deleteStaff(name).then(function(data){
            if(data.data.success) {
                getStaffs();
            }else{
                app1.showMoreError = data.data.message;
            }
        });
    };
    


    app1.addStaff = function(proData) {
        app1.loading = true;
        app1.errorMsg = false;
        Staff.create(app1.proData).then(function(data){
           if(data.data.success) {
                app1.loading = false;
                app1.successMsg = data.data.message + '......redirecting';
                $timeout(function(){
                    $location.path('/staff')
                },2000);
            }else{
                app1.loading = false;
                app1.errorMsg = data.data.message;
            }
        });
    };    
    

})

.controller('editCtrl',function($scope,$routeParams,Staff,$timeout){
    
    var app1 = this;
    $scope.nameTab = 'active';
    app1.phase1 = true;

    Staff.getStaff($routeParams.id).then(function(data){
        if(data.data.success){
            $scope.newName = data.data.staff.name;
            $scope.newUsername = data.data.staff.username;
            $scope.newPhoneNo = data.data.staff.phoneNo;
            $scope.newAddress = data.data.staff.address;
            $scope.newEmail = data.data.staff.email;
            $scope.newSpecialize = data.data.staff.specialize;
            app1.currentStaff = data.data.staff._id;
        }else{
            app1.errorMsg = data.data.message;
        }
    });

    app1.namePhase = function(){
        $scope.nameTab = 'active';
        $scope.usernameTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.emailTab = 'default';
        $scope.specializeTab = 'default';
        app1.phase1 = true;
        app1.phase2 = false;
        app1.phase3 = false;
        app1.phase4 = false;
        app1.phase5 = false;
        app1.phase6 = false;
    }
    app1.usernamePhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'active';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.emailTab = 'default';
        $scope.specializeTab = 'default';
        app1.phase1 = false;
        app1.phase2 = true;
        app1.phase3 = false;
        app1.phase4 = false;
        app1.phase5 = false;
        app1.phase6 = false;
    }
    app1.phoneNoPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.phoneNoTab = 'active';
        $scope.addressTab = 'default';
        $scope.emailTab = 'default';
        $scope.specializeTab = 'default';
        app1.phase1 = false;
        app1.phase2 = false;
        app1.phase3 = true;
        app1.phase4 = false;
        app1.phase5 = false;
        app1.phase6 = false;
    }
    app1.addressPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'active';
        $scope.emailTab = 'default';
        $scope.specializeTab = 'default';
        app1.phase1 = false;
        app1.phase2 = false;
        app1.phase3 = false;
        app1.phase4 = true;
        app1.phase5 = false;
        app1.phase6 = false;
    }
    app1.emailPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.emailTab = 'active';
        $scope.specializeTab = 'default';
        app1.phase1 = false;
        app1.phase2 = false;
        app1.phase3 = false;
        app1.phase4 = false;
        app1.phase5 = true;
        app1.phase6 = false;
    }
    app1.specializePhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.emailTab = 'default';
        $scope.specializeTab = 'active';
        app1.phase1 = false;
        app1.phase2 = false;
        app1.phase3 = false;
        app1.phase4 = false;
        app1.phase5 = false;
        app1.phase6 = true;
    }
    
    app1.updateName = function(newName,valid){
        app1.errorMsg = false;
        app1.disabled = true;
        var staffObject = {};
       
        if(valid){
            staffObject._id = app1.currentStaff;
            staffObject.name = $scope.newName;
            Staff.editStaff(staffObject).then(function(data){
                if(data.data.success){
                    app1.successMsg = data.data.message;
                    $timeout(function(){
                        app1.successMsg = false;
                        app1.disabled = false;
                    }, 2000);
                }else{
                    app1.errorMsg = data.data.message;
                    app1.disabled = false;
                }
            });
        }else{
            app1.errorMsg = 'Please ensure form is filled properly';
            app1.disabled = false;
        }
    };
    app1.updateUserName = function(newUsername,valid){
        app1.errorMsg = false;
        app1.disabled = true;
        var staffObject = {};
       
        if(valid){
            staffObject._id = app1.currentStaff;
            staffObject.username = $scope.newUsername;
            Staff.editStaff(staffObject).then(function(data){
                if(data.data.success){
                    app1.successMsg = data.data.message;
                    $timeout(function(){
                        app1.successMsg = false;
                        app1.disabled = false;
                    }, 2000);
                }else{
                    app1.errorMsg = data.data.message;
                    app1.disabled = false;
                }
            });
        }else{
            app1.errorMsg = 'Please ensure form is filled properly';
            app1.disabled = false;
        }
    };

    app1.updatePhoneNo = function(newPhoneNo,valid){
        app1.errorMsg = false;
        app1.disabled = true;
        var staffObject = {};
       
        if(valid){
            staffObject._id = app1.currentStaff;
            staffObject.phoneNo = $scope.newPhoneNo;
            Staff.editStaff(staffObject).then(function(data){
                if(data.data.success){
                    app1.successMsg = data.data.message;
                    $timeout(function(){
                        app1.successMsg = false;
                        app1.disabled = false;
                    }, 2000);
                }else{
                    app1.errorMsg = data.data.message;
                    app1.disabled = false;
                }
            });
        }else{
            app1.errorMsg = 'Please ensure form is filled properly';
            app1.disabled = false;
        }
    };

    app1.updateAddress = function(newAddress,valid){
        app1.errorMsg = false;
        app1.disabled = true;
        var staffObject = {};
       
        if(valid){
            staffObject._id = app1.currentStaff;
            staffObject.address = $scope.newAddress;
            Staff.editStaff(staffObject).then(function(data){
                if(data.data.success){
                    app1.successMsg = data.data.message;
                    $timeout(function(){
                        app1.successMsg = false;
                        app1.disabled = false;
                    }, 2000);
                }else{
                    app1.errorMsg = data.data.message;
                    app1.disabled = false;
                }
            });
        }else{
            app1.errorMsg = 'Please ensure form is filled properly';
            app1.disabled = false;
        }
    };

    app1.updateEmail = function(newEmail,valid){
        app1.errorMsg = false;
        app1.disabled = true;
        var staffObject = {};
       
        if(valid){
            staffObject._id = app1.currentStaff;
            staffObject.email = $scope.newEmail;
            Staff.editStaff(staffObject).then(function(data){
                if(data.data.success){
                    app1.successMsg = data.data.message;
                    $timeout(function(){
                        app1.successMsg = false;
                        app1.disabled = false;
                    }, 2000);
                }else{
                    app1.errorMsg = data.data.message;
                    app1.disabled = false;
                }
            });
        }else{
            app1.errorMsg = 'Please ensure form is filled properly';
            app1.disabled = false;
        }
    };
    app1.updateSpecialize = function(newSpecialize,valid){
        app1.errorMsg = false;
        app1.disabled = true;
        var staffObject = {};
       
        if(valid){
            staffObject._id = app1.currentStaff;
            staffObject.specialize = $scope.newSpecialize;
            Staff.editStaff(staffObject).then(function(data){
                if(data.data.success){
                    app1.successMsg = data.data.message;
                    $timeout(function(){
                        app1.successMsg = false;
                        app1.disabled = false;
                    }, 2000);
                }else{
                    app1.errorMsg = data.data.message;
                    app1.disabled = false;
                }
            });
        }else{
            app1.errorMsg = 'Please ensure form is filled properly';
            app1.disabled = false;
        }
    };

    
    
    
});


    