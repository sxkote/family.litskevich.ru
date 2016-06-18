'use strict';

angular.module('app')
    .controller('articlesController', ['$scope', '$routeParams', 'articlesService', 'fileService',
        function ($scope, $routeParams, articlesService, fileService) {

            if (!$scope.authService.isAuthenticated())
                $scope.navigationService.navigateToLogin();

            this.articles = [];
            this.article = new Article();

            this.materialToDelete = null;
            this.materialToUpdate = null;


            let getArticle = function (data) {
                this.article = new Article(data);
            }.bind(this);

            let getArticles = function (data) {
                for (let i = 0; i < data.length; i++)
                    this.articles.push(new Article(data[i]));
            }.bind(this);

            this.reload = function (id) {
                if (id == undefined || id == null)
                    id = $routeParams.id;

                if (id > 0)
                    articlesService.get(id).success(getArticle);
                else
                    this.article = new Article();
            };

            this.reloadAll = function () {
                articlesService.getAll().success(getArticles);
            };

            this.reloadAllByPerson = function (personID) {
                articlesService.getAllByPerson(personID).success(getArticles);
            };


            this.createArticle = function () {
                $scope.navigationService.modalClose('#create-article-dialog');
                articlesService.createArticle(this.article.Title).success(function (data) {
                    let newArticle = new Article(data);
                    this.articles.push(newArticle);
                    this.article = new Article();
                    $scope.navigationService.navigateToArticleModify(newArticle.ID);
                }.bind(this));
            };

            this.updateArticle = function () {
                if (!this.article)
                    return;

                articlesService.updateArticle(this.article).success(function (data) {
                    $scope.navigationService.navigateToArticleList();
                }.bind(this));
            };

            this.fileUploaded = function (file) {
                if (this.article) {
                    articlesService.addMaterial(this.article.ID, file.Code).success(function (data) {
                        this.article.addMaterial(data);
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
                    articlesService.deleteMaterial(this.materialToDelete.ArticleID, this.materialToDelete.ID)
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
                    articlesService.updateMaterial(this.materialToUpdate);
                    this.materialToUpdate = null;
                }
            };

            this.getMaterialAvatarUrl = function (material) {
                return fileService.getBlobAvatarUrl(material.Code);
            };

            this.displayMaterial = function(material){
              $('.media-container').show();
            };

        }]);