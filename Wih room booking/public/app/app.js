angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','staffController','staffServices','720kb.datepicker','angularjs-dropdown-multiselect','managementController','appointmentController','appointmentServices','roomServices','roomControllers','hotelServices','hotelControllers','bookingServices','bookingControllers'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('Authinterceptors');
});
