angular.module('app')
    .directive('articleCard', [function () {
        return {
            restrict: 'AE',
            scope: {
                article: '=article'
            },
            templateUrl: 'app/partials/article-card.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                    $scope.authService = $rootScope.authService;
                    $scope.navigationService = $rootScope.navigationService;

                    this.getPrimaryText = function () {
                        return $scope.article ? new moment($scope.article.Date).format('DD.MM.YYYY') : '';
                    };
                }]
        };
    }]);
