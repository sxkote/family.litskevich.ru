angular.module('app')
    .directive('articleMaterial', [
        function () {
            return {
                restrict: 'AE',
                scope: {
                    material: '=material',
                    editMaterial: '&editMaterial',
                    removeMaterial: '&removeMaterial'

                },
                require: ['ngModel'],
                templateUrl: 'app/partials/article-material.partial.html',
                controllerAs: 'vm',
                controller: ['$scope', '$element', 'fileService',
                    function ($scope, $element, fileService) {

                        this.getAvatarUrl = function () {
                            return fileService.getBlobAvatarUrl($scope.material.Code) + '&guid=' + fileService.makeGuid();
                        };

                        $scope.avatarUrl = this.getAvatarUrl();

                        this.editMaterial = function () {
                            if ($scope.editMaterial)
                                $scope.editMaterial({material: $scope.material});
                        };

                        this.removeMaterial = function () {
                            if ($scope.removeMaterial)
                                $scope.removeMaterial({material: $scope.material});
                        };

                        this.rotateMaterial = function (clockwise) {
                            return fileService.rotate($scope.material.Code, clockwise).success(function () {
                                $scope.avatarUrl = this.getAvatarUrl();
                            }.bind(this));
                        };
                    }]
            };
        }]);