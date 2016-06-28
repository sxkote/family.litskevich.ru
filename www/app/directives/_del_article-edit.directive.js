'use strict';

angular.module('app')
    .directive('articleEdit', [function () {
        return {
            restrict: 'AE',
            scope: {
                article: '=article'
            },
            templateUrl: 'app/partials/article-edit.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$element', 'articlesService',
                function ($scope, $element, articlesService) {
                    this.materialToDelete = null;
                    this.materialToUpdate = null;

                    this.fileUploaded = function (file) {
                        if ($scope.article) {
                            articlesService.addMaterial($scope.article.ID, file.Code).success(function (data) {
                                $scope.article.addMaterial(data);
                            }.bind(this));
                        }
                    };

                    this.showDeleteDialog = function (material) {
                        this.materialToDelete = material;
                        $element.find('#delete-material-dialog').modal('show');
                    };

                    this.showUpdateDialog = function (material) {
                        this.materialToUpdate = material;
                        $element.find('#update-material-dialog').modal('show');
                    };

                    this.deleteMaterial = function () {
                        if (this.materialToDelete) {
                            articlesService.deleteMaterial(this.materialToDelete.ArticleID, this.materialToDelete.ID)
                                .success(function () {
                                    $scope.article.removeMaterial(this.materialToDelete);
                                }.bind(this))
                                .finally(function () {
                                    this.materialToDelete = null;
                                }.bind(this));
                        }
                    };

                    this.updateMaterial = function () {
                        if (this.materialToUpdate) {
                            articlesService.updateMaterial(this.materialToUpdate);
                            this.materialToUpdate = null;
                        }
                    };
                }]
        };
    }]);
