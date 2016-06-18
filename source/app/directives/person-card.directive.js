angular.module('app')
    .directive('personCard', [function () {
        return {
            restrict: 'AE',
            scope: {
                person: '=person'
            },
            templateUrl: 'app/partials/person-card.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                    $scope.authService = $rootScope.authService;
                    $scope.navigationService = $rootScope.navigationService;
                }]
        };
    }]);
