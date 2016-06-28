'use strict';

angular.module('app')
    .controller('articlesController', ['$scope', '$routeParams', '$element', 'articlesService', 'materialsService',
        function ($scope, $routeParams, $element, articlesService, materialsService) {

            if (!$scope.authService.isAuthenticated())
                $scope.navigationService.navigateToLogin();

            this.articles = [];
            this.article = new Article();

            this.materialToDelete = null;
            this.materialToUpdate = null;

            this.reload = function (id) {
                if (id == undefined || id == null)
                    id = $routeParams.id;

                if (id > 0)
                    articlesService.getByID(id).success(function (data) {
                        this.article = new Article(data, materialsService);
                        this.reloadMediaGallery(this.article.Materials);
                    }.bind(this));
                else
                    this.article = new Article();
            };

            this.reloadAll = function () {
                articlesService.getAll().success(function (data) {
                    for (let i = 0; i < data.length; i++)
                        this.articles.push(new Article(data[i], materialsService));
                }.bind(this));
            };

            this.reloadAllByPerson = function (personID) {
                articlesService.getAllByPerson(personID).success(function (data) {
                    for (let i = 0; i < data.length; i++)
                        this.articles.push(new Article(data[i], materialsService));
                }.bind(this));
            };

            this.reloadMediaGallery = function (materials) {
                var items = [];
                for (let i = 0; i < materials.length; i++) {
                    let material = materials[i];
                    items.push({
                        id: material.Url,
                        type: material.Type,
                        url: material.ContentUrl,
                        thumbnail: material.ThumbnailUrl,
                        filename: material.FileName,
                        title: material.Title,
                        date: material.Date,
                        comment: material.Comment
                    });
                }

                $element.find('.sxmg').sxMediaGallery({
                    items: items
                });
            };

            this.createArticle = function () {
                $scope.navigationService.modalClose('#create-article-dialog');
                articlesService.createArticle(this.article.Title).success(function (data) {
                    $scope.navigationService.navigateToArticleModify(data.ID);
                }.bind(this));
            };

            this.updateArticle = function () {
                if (this.article) {
                    articlesService.updateArticle(this.article).success(function (data) {
                        $scope.navigationService.navigateToArticleList();
                    }.bind(this));
                }
            };

            this.fileUploaded = function (file) {
                if (this.article) {
                    materialsService.createMaterial(this.article.ID, file.Code).success(function (data) {
                        this.article.addMaterial(data, materialsService);
                    }.bind(this));
                }
            };

            this.showDeleteMaterialDialog = function (material) {
                this.materialToDelete = material;
                $('#delete-material-dialog').modal('show');
            };

            this.showUpdateMaterialDialog = function (material) {
                this.materialToUpdate = material;
                $('#update-material-dialog').modal('show');
            };

            this.deleteMaterial = function () {
                if (this.materialToDelete) {
                    materialsService.deleteMaterial(this.materialToDelete.ID)
                        .success(function () {
                            this.article.removeMaterial(this.materialToDelete);
                        }.bind(this))
                        .finally(function () {
                            this.materialToDelete = null;
                        }.bind(this));
                }
            };

            this.updateMaterial = function () {
                if (this.materialToUpdate) {
                    materialsService.updateMaterial(this.materialToUpdate);
                    this.materialToUpdate = null;
                }
            };
        }]);