angular.module('appointmentController', ['appointmentServices','authServices'])
.controller('appointmentCtrl', function($http,$location,$timeout, Appointment,$scope,Auth,$window,$rootScope) {

    var r = document.getElementById('result');
    var app2 = this;
    app2.loading = true;
    app2.errorMsg = false;
    $scope.minDate = new Date();

    $scope.detailsDoctors = [];
    
    $scope.model = []; 
    $scope.data = [ ];
    $scope.username = [];

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

    app2.search = function(searchKeyword, number){
        if(searchKeyword) {
            if(searchKeyword.length > 0){
                app2.limit = 0;
                $scope.searchFilter = searchKeyword;
                app2.limit = number;
            }else{
                $scope.searchFilter = undefined;
                app2.limit = 0;
            }
        }else{
            $scope.searchFilter = undefined;
            app2.limit = 0;
        }
    };

    app2.advanceSearch = function(searchByName){
        if(searchByName){
            $scope.advancedSearchFilter = {};
        }
        if(searchByName){
            $scope.advancedSearchFilter.patientName = searchByName;
        }
        
        app2.searchLimit = undefined;
    };
    app2.sortOrder = function(order){
        app2.sort = order;
    };

    app2.clear = function(){
        $scope.number = 'Clear';
        app2.limit = 0;
        $scope.searchKeyword =undefined;
        $scope.searchFilter = undefined;
        app2.showMoreError = false;
    };

    app2.showMore = function(number){
        app2.showMoreError = false;
        if(number > 0){
            app2.limit = number;
        }else{
            app2.showMoreError = 'Please enter a valid number';
        }
    };

    app2.showAll = function(){
        app2.limit = undefined;
        app2.showMoreError = false;
    };


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

    app2.deleteAppointment = function(patientName){
        console.log(patientName);
        Appointment.deleteAppointment(patientName).then(function(data){
            if(data.data.success) {
                getAppointments();
            }else{
                app2.showMoreError = data.data.message;
            }
        });
    };
    

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
            //To View
            $rootScope.addedApp = app2.appointmentData;
           if(data.data.success) {
                app2.loading = false;
                app2.successMsg = data.data.message + '......redirecting';
                
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
        "migraine",
        "liver Failure"
    ];

    $scope.diseaseKeys = [
        {
           "key":"dyspnea",
           "type":"Heart Failure"
        },
        {
            "key":"weakness",
            "type":"Heart Failure"
        },
        {
           "key":"Indigestion",
           "type":"gastritis"
        },
        {
            "key":"Nausea ",
            "type":"gastritis"
        },
        {
            "key":"Vomiting",
            "type":"gastritis"
        },
        {
           "key":"sore throat",
           "type":"cold"
        },
        {
            "key":"Cough",
            "type":"cold"
        },
        {
            "key":"Congestion",
            "type":"cold"
        },
        {
            "key":"Sneezing",
            "type":"cold"
        },
        {
           "key":"headache",
           "type":"migraine"
        },
        {
           "key":"Pain ",
           "type":"liver Failure"
        },
        {
            "key":"Vomiting ",
            "type":"liver Failure"
        },
        {
            "key":"Sleepiness ",
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

.controller('appointmentEditCtrl',function($scope,$routeParams,Appointment,$timeout){
    
        
    $scope.detailsDoctors = [];
    
    $scope.model = []; 
    $scope.data = [ ];
    $scope.minDate = new Date();

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
    
        
        var app2 = this;
        $scope.doctorNameTab = 'active';
        app2.phase1 = true;
    
        Appointment.getAppointment($routeParams.id).then(function(data){
            if(data.data.success){
                $scope.newDoctorName = data.data.appointment.doctorName;
                $scope.newDate = data.data.appointment.date;
                app2.currentAppointment = data.data.appointment._id;
    
                $scope.model =  data.data.appointment.doctorName;
            }else{
                app2.errorMsg = data.data.message;
            }
        });
    
        app2.doctorNamePhase = function(){
            $scope.doctorNameTab = 'active';
            $scope.dateTab = 'default';
            app2.phase1 = true;
            app2.phase2 = false;
        }
        app2.datePhase = function(){
            $scope.doctorNameTab = 'default';
            $scope.dateTab = 'active';
            app2.phase1 = false;
            app2.phase2 = true;
        }
    
        app2.updateDoctorName = function(newDoctorName,valid){
            app2.errorMsg = false;
            app2.disabled = true;
            app2.doctorName = $scope.model;
            var appointmentObject = {};
           
            if(valid){
                appointmentObject._id = app2.currentAppointment;
                appointmentObject.doctorName = $scope.newDoctorName;
                Appointment.editAppointment(appointmentObject).then(function(data){
                    if(data.data.success){
                        app2.successMsg = data.data.message;
                        $timeout(function(){
                            app2.successMsg = false;
                            app2.disabled = false;
                        }, 2000);
                    }else{
                        app2.errorMsg = data.data.message;
                        app2.disabled = false;
                    }
                });
            }else{
                app2.errorMsg = 'Please ensure form is filled properly';
                app2.disabled = false;
            }
        };
        app2.updateDate = function(newDate,valid){
            app2.errorMsg = false;
            app2.disabled = true;
            var appointmentObject = {};
           
            if(valid){
                appointmentObject._id = app2.currentAppointment;
                appointmentObject.date = $scope.newDate;
                Appointment.editAppointment(appointmentObject).then(function(data){
                    if(data.data.success){
                        app2.successMsg = data.data.message;
                        $timeout(function(){
                            app2.successMsg = false;
                            app2.disabled = false;
                        }, 2000);
                    }else{
                        app2.errorMsg = data.data.message;
                        app2.disabled = false;
                    }
                });
            }else{
                app2.errorMsg = 'Please ensure form is filled properly';
                app2.disabled = false;
            }
        };
    
        
    })

    .controller('appointmentViewCtrl',function($scope,$routeParams,Appointment,$timeout){
        
       
            var app2 = this;
        
            Appointment.getOneAppointment($routeParams.id).then(function(data){
                if(data.data.success){
                    $scope.PatientName = data.data.appointment.patientName;
                    $scope.Disease = data.data.appointment.disease;
                    $scope.DoctorName = data.data.appointment.doctorName;
                    $scope.Date = data.data.appointment.date;
                    app2.currentAppointment = data.data.appointment._id;
        
                }else{
                    app2.errorMsg = data.data.message;
                }
            });
        
            
        });