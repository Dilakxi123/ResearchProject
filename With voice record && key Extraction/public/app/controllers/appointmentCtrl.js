angular.module('appointmentController', [])
.controller('appointmentCtrl', function($scope, $http) {

    var r = document.getElementById('result');


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
            // });
        } else {
            alert("Pleaes talk regarding the disease before analysing");
        }
    }

})