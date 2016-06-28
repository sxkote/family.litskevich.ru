angular.module('app')
    .directive('personEdit', [function () {
        return {
            restrict: 'AE',
            scope: {
                person: '=person'
            },
            templateUrl: 'app/partials/person-edit.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', function ($scope) {

            }]
        };
    }]);
