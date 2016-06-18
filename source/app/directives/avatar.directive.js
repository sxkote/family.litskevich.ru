angular.module('app')
    .directive('avatar', [function () {
        return {
            restrict: 'AE',
            scope: {
                avatar: '=avatar',
                size: '@size',
                alternate: '@alternate'
            },
            templateUrl: 'app/partials/avatar.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', function ($scope) {

                //let size = $scope.size;
                //if (!size || size <= 0)
                //    size = 100;
                //
                //this.style = {width: size + 'px', height: size + 'px'};
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
