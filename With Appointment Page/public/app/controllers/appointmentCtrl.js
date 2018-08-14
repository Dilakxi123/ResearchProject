angular.module('appointmentController', ['appointmentServices','authServices'])
.controller('appointmentCtrl', function($http,$location,$timeout, Appointment,$scope,Auth,$window) {

    var r = document.getElementById('result');
    var app2 = this;
    app2.loading = true;
    app2.errorMsg = false;
    $scope.minDate = new Date();

    $scope.detailsDoctors = [];
    
    $scope.model = []; 
    $scope.data = [ ];
    $scope.username = [];

    // $rootScope.$on('$routeChangeStart', function() {
    //     if(Auth.isLoggedIn()){
    //         app.isLoggedIn = true;
    //         Auth.getUser().then(function(data){
    //             $scope.username = data.data.username;
    //         });
    //     }else{
    //         app.isLoggedIn = false;
    //         app.username = '';
    //     }
    // });

    function getStaffs()
    {
        Appointment.getStaffs().then(function(data){
            if(data.data.success){
                $scope.detailsDoctors = data.data.doctorlist;
                //split since linq requires js
                for (var i = 0, len = $scope.detailsDoctors.length; i < len; i++) {
                    $scope.data.push({id: $scope.detailsDoctors[i].name, label: $scope.detailsDoctors[i].name});
                  }
            }else{
            }
        });
    }

    getStaffs();

    function getAppointments(){
        Appointment.getAppointments().then(function(data){
            if(data.data.success){
                app2.appointments = data.data.appointments;
                app2.loading = false;
            }else{
                app2.errorMsg = data.data.message;
                app2.loading = false;
            }
        });
    }

    getAppointments()

    app2.addAppointment = function(appointmentData) {
        app2.loading = true;
        app2.errorMsg = false;

        app2.appointmentData.doctorName = $scope.model;
        app2.appointmentData.disease = $scope.diseaseModal;
        app2.appointmentData.patientName = $scope.username;
        

        Appointment.create(app2.appointmentData).then(function(data){
            data.doctorName = $scope.model; 
            data.patientName = $scope.username;
            data.disease = $scope.diseaseModal;
           if(data.data.success) {
                app2.loading = false;
                app2.successMsg = data.data.message + '......redirecting';
                $timeout(function(){
                    $location.path('/management')
                },2000);
            }else{
                app2.loading = false;
                app2.errorMsg = data.data.message;
            }
        });
    };

    $scope.ReadText = "";
    $scope.startConverting = function() {
        if ('webkitSpeechRecognition' in window) {
            var speechRecognizer = new webkitSpeechRecognition();
            speechRecognizer.continuous = true;
            speechRecognizer.interimResults = true;
            speechRecognizer.lang = 'en-IN';
            speechRecognizer.start();

            var finalTranscripts = '';

            speechRecognizer.onresult = function(event) {
                var interimTranscripts = '';
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var transcript = event.results[i][0].transcript;
                    $scope.ReadText += transcript;
                    transcript.replace("\n", "<br>");
                    if (event.results[i].isFinal) {
                        finalTranscripts += transcript;
                    } else {
                        interimTranscripts += transcript;
                    }
                }
                r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
            };
            speechRecognizer.onerror = function(event) {};
        } else {
            r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
        }
    }


    $scope.diseaseData = [
        "Heart Failure",
        "gastritis",
        "cold",
        "headache",
        "liver Failure"
    ];

    $scope.diseaseKeys = [
        {
           "key":"headache",
           "type":"Heart Failure"
        },
        {
           "key":"stomach",
           "type":"gastritis"
        },
        {
           "key":"sore throat",
           "type":"cold"
        },
        {
           "key":"migraine",
           "type":"headache"
        },
        {
           "key":"liver",
           "type":"liver Failure"
        }
     ];



     $scope.indexOfMax = function(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
    $scope.analyseData = function() {
        if ($scope.ReadText != '') {
            // $http.get('../../assests/data/disdata.json').success(function(data) {
            //     $scope.diseaseData = data;
            // });

            var diseCount = new Array($scope.diseaseData.length);
            diseCount.fill(0);
            // $http.get('../../assests/data/meddata.json').success(function(data) {
                // alert(JSON.stringify(data));

                for (var i = 0; i < $scope.diseaseKeys.length; i++) {
                    if ($scope.ReadText.toLowerCase().indexOf($scope.diseaseKeys[i].key.toLowerCase()) >= 0) {
                        diseCount[$scope.diseaseData.indexOf($scope.diseaseKeys[i].type)]++;
                    }
                }
               alert('The disease is ' + $scope.diseaseData[$scope.indexOfMax(diseCount)]);
               $scope.diseaseModal = $scope.diseaseData[$scope.indexOfMax(diseCount)].trim();
               $scope.username = $window.localStorage.getItem('username');
            // });
        } else {
            alert("Pleaes talk regarding the disease before analysing");
        }
    }

    
    $scope.filterExpression = function(detailsDoctors, index) {
        // console.log(JSON.stringify(index));
        
        // console.log(JSON.stringify(detailsDoctors));
        if($scope.detailsDoctors != null && $scope.diseaseModal != null)
            return ($scope.detailsDoctors[index].specialize.toLowerCase().indexOf($scope.diseaseModal.toLowerCase()) !=  -1);
        else 
            return true;
    };
})