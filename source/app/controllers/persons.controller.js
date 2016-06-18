'use strict';

angular.module('app')
    .controller('personsController', ['$scope', '$routeParams', 'personsService',
        function ($scope, $routeParams, personsService) {

            this.persons = [];
            this.person = new Person();


            let getPerson = function (data) {
                this.person = new Person(data);
            }.bind(this);

            let getPersons = function (data) {
                for (let i = 0; i < data.length; i++)
                    this.persons.push(new Person(data[i]));
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

            this.createPerson = function () {
                $scope.navigationService.modalClose('#create-person-dialog');

                if (!this.person)
                    return;

                personsService.createPerson(this.person).success(function (data) {
                    let newPerson = new Person(data);
                    this.persons.push(newPerson);
                    this.person = new Person();
                    $scope.navigationService.navigateToPersonModify(newPerson.ID);
                }.bind(this));
            };

            this.updatePerson = function () {
                if (!this.person)
                    return;

                personsService.updatePerson(this.person).success(function () {
                    $scope.navigationService.navigateToPersonList();
                }.bind(this));
            };
        }]);