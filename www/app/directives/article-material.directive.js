angular.module('app')
    .directive('articleMaterial', [
        function () {
            return {
                restrict: 'AE',
                scope: {
                    article: '=article',
                    material: '=material',
                    editMaterial: '&editMaterial',
                    removeMaterial: '&removeMaterial'
                },
                require: ['ngModel'],
                templateUrl: 'app/partials/article-material.partial.html',
                controllerAs: 'vm',
                controller: ['$scope', '$element', 'fileService', 'articlesService','materialsService',
                    function ($scope, $element, fileService, articlesService, materialsService) {

                        this.getUniqueThumbnailUrl = function () {
                            //return articlesService.getMaterialThumbnailUrl($scope.material, '&guid=' + fileService.makeGuid());
                            return $scope.material.ThumbnailUrl + '&guid=' + fileService.makeGuid();
                        };

                        $scope.thumbnailUrl = this.getUniqueThumbnailUrl();

                        this.editMaterial = function () {
                            if ($scope.editMaterial)
                                $scope.editMaterial({material: $scope.material});
                        };

                        this.removeMaterial = function () {
                            if ($scope.removeMaterial)
                                $scope.removeMaterial({material: $scope.material});
                        };

                        this.rotateMaterial = function (clockwise) {
                            return materialsService.rotateMaterial($scope.material.ID, clockwise)
                                .success(function () {
                                    $scope.thumbnailUrl = this.getUniqueThumbnailUrl();
                                }.bind(this));
                        };
                    }]
            };
        }]);