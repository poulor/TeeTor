app.directive('navbar', function () {
    return {
        restrict: 'E', scope: {
            info: '='
        },

        templateUrl: '../js/directives/navbar.html'
    };
});