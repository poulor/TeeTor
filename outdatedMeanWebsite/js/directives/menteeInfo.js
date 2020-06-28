app.directive('menteeInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: '../js/directives/menteeInfo.html'
    };
});