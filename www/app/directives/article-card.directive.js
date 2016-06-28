angular.module('app')
    .directive('articleCard', [function () {
        return {
            restrict: 'AE',
            scope: {
                article: '=article',
                classes: '@classes'
            },
            templateUrl: 'app/partials/article-card.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                    $scope.authService = $rootScope.authService;
                    $scope.navigationService = $rootScope.navigationService;

                    this.smallComment = function () {
                        if (!$scope.article || !$scope.article.Comment)
                            return '';
                        else if ($scope.article.Comment.length > 60)
                            return $scope.article.Comment.substr(0, 60) + '...'
                        else
                            return $scope.article.Comment;
                    };
                }]
        };
    }]);
