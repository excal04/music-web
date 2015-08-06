
var app = angular.module("MPApp", []);
//
// app.run(function($rootScope) {
//     $rootScope.name = "Jeffy";
// });

app.controller("PlayerController", ["$scope", function($scope) {
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
}]);

app.controller("RelatedController", ["$scope", function($scope) {

}]);
