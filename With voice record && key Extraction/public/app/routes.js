var app = angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
    $routeProvider
    
    .when('/',{
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/about',{
        templateUrl: 'app/views/pages/about.html'
    })

    .when('/register',{
        templateUrl: 'app/views/pages/users/register.html',
        controller:'regCtrl',
        controllerAs:'register',
        authenticated: false
    })

    .when('/login',{
        templateUrl: 'app/views/pages/users/login.html',
        authenticated: false
    })

    .when('/logout',{
        templateUrl: 'app/views/pages/users/logout.html',
        authenticated: true
    })

    .when('/profile',{
        templateUrl: 'app/views/pages/users/profile.html',
        authenticated: true
    })
    .when('/staff',{
        templateUrl: 'app/views/pages/staffs/staff.html',
        controller: 'staffCtrl',
        controllerAs: 'staff',
        authenticated: true
    })
    .when('/appointment',{
        templateUrl: 'app/views/pages/appointment.html',
        controller: 'appointmentCtrl',
        controllerAs: 'appointment',
        authenticated: true
    })
    .when('/addStaff',{
        templateUrl: 'app/views/pages/staffs/addStaff.html',
        controller: 'staffCtrl',
        controllerAs: 'staff',
        authenticated: true
    })
    .when('/edit/:id', {
        templateUrl: 'app/views/pages/staffs/edit.html',
        controller: 'editCtrl',
        controllerAs: 'edit',
        authenticated: true
    })
    .when('/search', {
        templateUrl: 'app/views/pages/staffs/search.html',
        controller: 'staffCtrl',
        controllerAs: 'staff',
        authenticated: true
    })
    .when('/management', {
        templateUrl: 'app/views/pages/management/management.html',
        controller: 'managementCtrl',
        controllerAs: 'management',
        authenticated: true,
        permission: ['admin','user']
    })
    .when('/userEdit/:id', {
        templateUrl: 'app/views/pages/management/userEdit.html',
        controller: 'userEditCtrl',
        controllerAs: 'userEdit',
        authenticated: true,
        permission: ['admin','user']
    })
    
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.run(['$rootScope', 'Auth', '$location','User', function($rootScope,Auth,$location,User) {
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route.authenticated === true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }else if(next.$$route.permission) {
                User.getPermission().then(function(data) {
                    if(next.$$route.permission[0] !== data.data.permission) {
                        if(next.$$route.permission[1] !== data.data.permission) {       
                            event.preventDefault();
                            $location.path('/');
                        }
                    }
                });
            }
        }else if(next.$$route.authenticated === false){
            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('profile');
            }
        }
    });
}]);

