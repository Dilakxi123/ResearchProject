angular.module('bookingControllers',['bookingServices'])

.controller('bookingCtrl',function(Booking,$scope,$filter) {
 

    $scope.detailsHotels;
    
    $scope.data = [ ];
    $scope.model = []; 


    function getHotels()
    {
        Booking.getHotels().then(function(data){
            if(data.data.success){
                $scope.detailsHotels = data.data.hotellist;
                //split since linq requires js
                for (var i = 0, len = $scope.detailsHotels.length; i < len; i++) {
                    $scope.data.push({id: $scope.detailsHotels[i].name, label: $scope.detailsHotels[i].name});
                  }
            }else{
            }
        });
    }

    getHotels();

    $scope.onCategoryChange = function (hotName) {
        $scope.filterData = $filter('filter')($scope.detailsHotels, {name: hotName});
        console.log('Filter');
    };

   
});