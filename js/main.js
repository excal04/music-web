
var app = angular.module("MPApp", []);

var nprUrl = "http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON",
// var nprUrl = "http://api.npr.org/query?id=166969902&fields=title,text,audio&dateType=story&output=JSON",
// var nprUrl = "http://api.npr.org/query?id=46&fields=title,text,audio&dateType=story&output=JSON",
    apiKey = "MDIwMDkwNDMzMDE0Mzg4MjYyMTA1YmI2Nw001";

app.controller("PlayerController", ["$scope", "$http", "audio", "player", "nprService", function($scope, $http, audio, player, nprService) {
    $scope.audio = audio;
    $scope.player = player;
    // $scope.playing = false;
    // $scope.currentTrack = null;
    // $scope.audio.src = "./HumanBeatbox1.mp3";

    nprService.programs(apiKey).success(function(data, status) {
        console.log("DATA:");
        console.log(data);

        // assign data from JSON to programs
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

app.factory("audio", function() {
    var audio = document.createElement("audio");
    return audio;
});

app.factory("player", ["audio", "$rootScope",
    function(audio, $rootScope) {
        var player = {
            playing: false,
            currentTrack: null,
            ready: false,

            currentTime: function() {
                return audio.currentTime;
            },

            currentDuration: function() {
                return audio.duration;
            },

            play : function(program) {
                if (this.playing) {
                    this.stop(program);
                    return;
                }
                // format.mp4.$text is the route to the mp4 file from the NPR api
                var url = program.audio[0].format.mp4.$text;
                audio.src = url;
                audio.play();
                this.playing = true;
                this.currentTrack = program.title.$text;
                console.log("current = ", this.currentTrack);

                console.log("play func");
            },

            stop : function(program) {
                audio.pause();
                this.playing = false;
                console.log("stop func");
                this.currentTrack = null;
            }

        };
        audio.addEventListener("ended", function() {
            console.log("ended!!");
            $rootScope.$apply(function() {
                player.stop();
            });
        });
        return player;
}]);


app.factory("nprService", ["$http", function($http) {
    function doRequest(apiKey) {
        console.log("using get");
        return $http({
            method: "GET",
            url: nprUrl + "&apiKey=" + apiKey// + "&callback=JSON_CALLBACK"
        });
    }

    return {
        programs: function(apiKey){
            console.log("npr service object");
            return doRequest(apiKey);
        }
    };
}]);
