'use strict';

angular.module('app')
    .directive('personList', [function () {
        return {
            restrict: 'AE',
            scope: {
                persons: '=persons'
            },
            templateUrl: 'app/partials/person-list.partial.html',
            controllerAs: 'vm',
            controller: ['$scope',
                function ($scope) {
                    this.filter = '';
                }]
        };
    }]);
