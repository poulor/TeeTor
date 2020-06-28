app.directive('mentorInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: '../js/directives/mentorInfo.html'
    };
});