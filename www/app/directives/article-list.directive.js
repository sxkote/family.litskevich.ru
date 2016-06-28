'use strict';

angular.module('app')
    .directive('articleList', [function () {
        return {
            restrict: 'AE',
            scope: {
                articles: '=articles',
                filter: '@filter'
            },
            templateUrl: 'app/partials/article-list.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                    this.filter = '';

                    this.isFilterVisible = true;
                    if ($scope.filter === false || $scope.filter == "false" || $scope.filter == "none")
                        this.isFilterVisible = false;
                    else
                        this.filter = $scope.filter;

                    $scope.authService = $rootScope.authService;
                    $scope.navigationService = $rootScope.navigationService;
                }]
        };
    }]);
