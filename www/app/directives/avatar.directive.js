angular.module('app')
    .directive('avatar', ['fileService', function (fileService) {
        return {
            restrict: 'AE',
            scope: {
                avatar: '=avatar',
                size: '@size',
                alternate: '@alternate',
                classes: '@classes',
                personID: '@personId'
            },
            templateUrl: 'app/partials/avatar.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                $scope.navigationService = $rootScope.navigationService;
                $scope.fileService = fileService;

                this.onClick = function ($event) {
                    if ($scope.personID >= 0) {
                        $event.stopPropagation();
                        $scope.navigationService.navigateToPersonShow($scope.personID);
                    }
                };
            }],
            link: function (scope, element, attributes) {
                let image = element.find("img");

                let size = attributes.size;
                if (!size || size <= 0)
                    size = 100;

                image.css({width: size, height: size});

                image.attr('title', attributes.alternate);
                //image.attr('alt', attributes.alternate);

                image.tooltip();
            }
        };
    }]);
