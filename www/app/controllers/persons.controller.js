'use strict';

angular.module('app')
    .controller('personsController', ['$scope', '$routeParams', 'personsService', 'articlesService',
        function ($scope, $routeParams, personsService, articlesService) {

            this.persons = [];
            this.person = new Person();
            this.articles = [];

            let getPerson = function (data) {
                this.person = new Person(data);
            }.bind(this);

            let getPersons = function (data) {
                for (let i = 0; i < data.length; i++)
                    this.persons.push(new Person(data[i]));
            }.bind(this);

            let getArticles = function (data) {
                for (let i = 0; i < data.length; i++)
                    this.articles.push(new Article(data[i]));
            }.bind(this);

            this.reload = function (id) {
                if (id == undefined || id == null)
                    id = $routeParams.id;

                if (id > 0)
                    personsService.get(id).success(getPerson);
                else
                    this.person = new Person();
            };

            this.reloadAll = function () {
                personsService.getAll().success(getPersons);
            };

            this.reloadWithArticles = function (id) {
                if (id == undefined || id == null)
                    id = $routeParams.id;

                this.reload(id);

                articlesService.getAllByPerson(id).success(getArticles);
            };

            this.createPerson = function () {
                $scope.navigationService.modalClose('#create-person-dialog');

                if (!this.person)
                    return;

                personsService.createPerson(this.person).success(function (data) {
                    $scope.navigationService.navigateToPersonModify(data.ID);
                }.bind(this));
            };

            this.updatePerson = function () {
                if (!this.person)
                    return;

                personsService.updatePerson(this.person).success(function () {
                    $scope.navigationService.navigateToPersonList();
                }.bind(this));
            };

            this.showCreateManagerDialog = function () {
                if (!this.person || !$scope.authService.isAdmin())
                    return;

                this.manager = new Manager(this.person ? this.person.Email || '' : '');
                this.manager.addRole(ManagerRoleType.User);

                $('#create-manager-dialog').modal('show');

                if (this.person.Email == undefined || this.person.Email == null || this.person.Email == '') {
                    $.snackbar({
                        content: `<strong>Обратите внимение</strong>, что не указан E-mail,<br> на который нужно отправлять письмо с доступом!!!`,
                        timeout: 7000,
                        htmlAllowed: true
                    });
                }
            };

            this.createManager = function () {
                if (!$scope.authService.isAdmin())
                    return;

                personsService.createManager(this.person.ID, this.manager.login, this.manager.password, this.manager.getRolesString())
                    .success(function () {
                        $.snackbar({
                            content: `Создан новый пользователь с логином <strong>${this.manager.login}</strong>.<br> Ему на почту <strong>${this.person.Email}</strong> было отправлено письмо с доступом к сайту!`,
                            timeout: 10000,
                            htmlAllowed: true
                        });
                        $('#create-manager-dialog').modal('hide');
                    }.bind(this));
            };
        }]);