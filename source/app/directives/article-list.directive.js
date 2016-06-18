'use strict';

angular.module('app')
    .directive('articleList', [function () {
        return {
            restrict: 'AE',
            scope: {
                articles: '=articles'
            },
            templateUrl: 'app/partials/article-list.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                    this.filter = '';

                    $scope.authService = $rootScope.authService;
                    $scope.navigationService = $rootScope.navigationService;
                }]
        };
    }]);
