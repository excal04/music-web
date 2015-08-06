
var app = angular.module("MPApp", []);

var nprUrl = "http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON",
    apiKey = "MDIwMDkwNDMzMDE0Mzg4MjYyMTA1YmI2Nw001";

app.controller("PlayerController", ["$scope", "$http", function($scope, $http) {
    $scope.audio = document.createElement("audio");
    $scope.playing = false;
    $scope.audio.src = "./HumanBeatbox1.mp3";

    $scope.play = function() {
        $scope.audio.play();
        $scope.playing = true;
    };

    $scope.stop = function() {
        $scope.audio.pause();
        $scope.playing = false;
    };

    $scope.audio.addEventListener("ended", function() {
        console.log("ended!!");
        $scope.$apply(function() {
            $scope.stop();
        });
    });

    $http({
        method: "JSONP",
        url: nprUrl + "&apiKey=" + apiKey + "&callback=JSON_CALLBACK"
    }).success(function(data, status) {
        console.log("DATA:");
        console.log(data);

        $scope.programs = data.list.story;
    }).error(function() {
        // error occured
        console.log("error");
    });
}]);

app.controller("RelatedController", ["$scope", function($scope) {

}]);

app.controller("ClockController", function($scope) {
    $scope.person = "Blue";
    var updateClock = function() {
        $scope.clock = new Date();
    };

    var timer = setInterval(function() {
        $scope.$apply(updateClock());
    }, 1000);

    updateClock();
});
