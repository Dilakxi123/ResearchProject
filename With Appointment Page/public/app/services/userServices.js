angular.module('userServices',[])

.factory('User', function($http){
var userFactory = {};

userFactory.create = function(regData) {
    return $http.post('/api/users', regData);
};

//User.checkUsername(regData);
userFactory.checkUsername = function(regData) {
    return $http.post('/api/checkusername', regData);
};

//User.checkEmail(regData);
userFactory.checkEmail = function(regData) {
    return $http.post('/api/checkemail', regData);
};

userFactory.getPermission = function() {
    return $http.get('/api/permission')
};

/*userFactory.getUsers = function(){
    return $http.get('/api/users');
};*/

userFactory.getUsers = function() {
    return $http.get('/api/management/');
};
userFactory.getUser= function(id){
    return $http.get('/api/userEdit/' +id );
};
userFactory.deleteUser = function(username) {
    return $http.delete('/api/management/' + username);
};

userFactory.editUser = function(id) {
    return $http.put('/api/userEdit/', id);
};
return userFactory;
});