angular.module('managementController', [])
.controller('managementCtrl', function(User){

    var app = this;

    app.loading = true;
    app.accessDenied = true;
    app.errorMsg = false; 
    app.deleteAccess = false;
    app.editAccess = false;

    function getUsers() {
        User.getUsers().then(function(data) {
            if(data.data.success) {
                if(data.data.permission === 'admin' || data.data.permission === 'user') {
                    app.users = data.data.users;
                    app.loading = false;
                    app.accessDenied = false;
                    if(data.data.permission === 'admin') {
                        app.deleteAccess = true;
                        app.editAccess = true;
                    }else if(data.data.permission === 'user') {
                        app.editAccess = true;
                    }
                }else {
                    app.errorMsg = 'Insufficient permission';
                    app.loading = false;
                }
            }else {
                app.errorMsg = data.data.message;
                app.loading =  false;
            }
        });
    }

    getUsers();    

    app.deleteUser = function(username) {
        User.deleteUser(username).then(function(data) {
            if(data.data.success) {
                getUsers(); 
            }else {
                app.showMoreError = data.data.message;
            }
        });
    };
})
.controller('userEditCtrl',function($scope,$routeParams,User,$timeout) {
    var app3 = this;
    $scope.nameTab = 'active';
    app3.phase1 = true;

    User.getUser($routeParams.id).then(function(data){
        if(data.data.success){
            $scope.newName = data.data.user.name;
            $scope.newUsername = data.data.user.username;
            $scope.newEmail = data.data.user.email;
            $scope.newAge = data.data.user.age;
            $scope.newPhoneNo = data.data.user.phoneNo;
            $scope.newAddress = data.data.user.address;
            $scope.newPermission = data.data.user.permission;
            app3.currentUser = data.data.user._id;
        }else{
            app3.errorMsg = data.data.message;
        }
    });

    app3.namePhase = function(){
        $scope.nameTab = 'active';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.ageTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.permissionTab = 'default';
        app3.phase1 = true;
        app3.phase2 = false;
        app3.phase3 = false;
        app3.phase4 = false;
        app3.phase5 = false;
        app3.phase6 = false;
        app3.phase7 = false;
    }
    app3.usernamePhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'active';
        $scope.emailTab = 'default';
        $scope.ageTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.permissionTab = 'default';
        app3.phase1 = false;
        app3.phase2 = true;
        app3.phase3 = false;
        app3.phase4 = false;
        app3.phase5 = false;
        app3.phase6 = false;
        app3.phase7 = false;
    }
    app3.emailPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'active';
        $scope.ageTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.permissionTab = 'default';
        app3.phase1 = false;
        app3.phase2 = false;
        app3.phase3 = true;
        app3.phase4 = false;
        app3.phase5 = false;
        app3.phase6 = false;
        app3.phase7 = false;
    }
    app3.agePhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.ageTab = 'active';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.permissionTab = 'default';
        app3.phase1 = false;
        app3.phase2 = false;
        app3.phase3 = false;
        app3.phase4 = true;
        app3.phase5 = false;
        app3.phase6 = false;
        app3.phase7 = false;
    }
    app3.phoneNoPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.ageTab = 'default';
        $scope.phoneNoTab = 'active';
        $scope.addressTab = 'default';
        $scope.permissionTab = 'default';
        app3.phase1 = false;
        app3.phase2 = false;
        app3.phase3 = false;
        app3.phase4 = false;
        app3.phase5 = true;
        app3.phase6 = false;
        app3.phase7 = false;
    }
    app3.addressPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.ageTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'active';
        $scope.permissionTab = 'default';
        app3.phase1 = false;
        app3.phase2 = false;
        app3.phase3 = false;
        app3.phase4 = false;
        app3.phase5 = false;
        app3.phase6 = true;
        app3.phase7 = false;
    }
    app3.permissionPhase = function(){
        $scope.nameTab = 'default';
        $scope.usernameTab = 'default';
        $scope.emailTab = 'default';
        $scope.ageTab = 'default';
        $scope.phoneNoTab = 'default';
        $scope.addressTab = 'default';
        $scope.permissionTab = 'active';
        app3.phase1 = false;
        app3.phase2 = false;
        app3.phase3 = false;
        app3.phase4 = false;
        app3.phase5 = false;
        app3.phase6 = false;
        app3.phase7 = true;

        app3.disableUser = false;
        app3.disableAdmin = false;

        if($scope.newPermission === 'user') {
            app3.disableUser = true;
        }else if($scope.newPermission === 'admin'){
            app3.disableAdmin = true;
        }
    };

    app3.updateName = function(newName, valid) {
        app3.errorMsg = false;
        app3.disabled = true;
        var userObject = {};
        

        if(valid) {
            userObject._id = app3.currentUser;
            userObject.name = $scope.newName;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.nameForm.name.$setPristine();
                        app3.nameForm.name.$setUntouched();
                        app3.successMsg = false;
                        app3.disabled = false;
                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        }else {
            app3.errorMsg = 'Please ensure form is filled'
            app3.disabled = false;
        }
    };

    app3.updateEmail = function(newEmail, valid) {
        app3.errorMsg = false;
        app3.disabled = true;
        var userObject = {};
        

        if(valid) {
            userObject._id = app3.currentUser;
            userObject.email = $scope.newEmail;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.emailForm.email.$setPristine();
                        app3.emailForm.email.$setUntouched();
                        app3.successMsg = false;
                        app3.disabled = false;
                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        }else {
            app3.errorMsg = 'Please ensure form is filled'
            app3.disabled = false;
        }
    };
    app3.updateUsername = function(newUsername, valid) {
        app3.errorMsg = false;
        app3.disabled = true;
        var userObject = {};
        

        if(valid) {
            userObject._id = app3.currentUser;
            userObject.username = $scope.newUsername;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.usernameForm.username.$setPristine();
                        app3.usernameForm.username.$setUntouched();
                        app3.successMsg = false;
                        app3.disabled = false;
                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        }else {
            app3.errorMsg = 'Please ensure form is filled'
            app3.disabled = false;
        }
    };

    app3.updateAge = function(newAge, valid) {
        app3.errorMsg = false;
        app3.disabled = true;
        var userObject = {};
        

        if(valid) {
            userObject._id = app3.currentUser;
            userObject.age = $scope.newAge;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.ageForm.age.$setPristine();
                        app3.ageForm.age.$setUntouched();
                        app3.successMsg = false;
                        app3.disabled = false;
                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        }else {
            app3.errorMsg = 'Please ensure form is filled'
            app3.disabled = false;
        }
    };

    app3.updatePhoneNo = function(newPhoneNo, valid) {
        app3.errorMsg = false;
        app3.disabled = true;
        var userObject = {};
        

        if(valid) {
            userObject._id = app3.currentUser;
            userObject.phoneNo = $scope.newPhoneNo;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.phoneNoForm.phoneNo.$setPristine();
                        app3.phoneNoForm.phoneNo.$setUntouched();
                        app3.successMsg = false;
                        app3.disabled = false;
                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        }else {
            app3.errorMsg = 'Please ensure form is filled'
            app3.disabled = false;
        }
    };

    app3.updateAddress = function(newAddress, valid) {
        app3.errorMsg = false;
        app3.disabled = true;
        var userObject = {};
        

        if(valid) {
            userObject._id = app3.currentUser;
            userObject.address = $scope.newAddress;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.addressForm.address.$setPristine();
                        app3.addressForm.address.$setUntouched();
                        app3.successMsg = false;
                        app3.disabled = false;
                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        }else {
            app3.errorMsg = 'Please ensure form is filled'
            app3.disabled = false;
        }
    };

    app3.updatePermission = function(newPermission) {
        app3.errorMsg = false;
        app3.disableUser = true;
        app3.disableAdmin = true;
        var userObject = {};
        

            userObject._id = app3.currentUser;
            userObject.permission = newPermission;
            User.editUser(userObject).then(function(data){
                if(data.data.success) {
                    app3.successMsg = data.data.message;
                    $timeout(function(){
                        app3.successMsg = false;

                        if(newPermission === 'user') {
                            $scope.newPermission = 'user';
                            app3.disableUser = true;
                            app3.disableAdmin = false;
                        }else if(newPermission === 'admin'){
                            $scope.newPermission = 'admin';
                            app3.disableAdmin = true;
                            app3.disableUser = false;
                        }

                    }, 2000);
                }else{
                    app3.errorMsg = data.data.message;
                    app3.disabled = false;
                }
            });
        
    };

});