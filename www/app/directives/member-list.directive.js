'use strict';

angular.module('app')
    .directive('memberList', [function () {
        return {
            restrict: 'AE',
            scope: {
                members: '=members'
            },
            templateUrl: 'app/partials/member-list.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', 'personsService',
                function ($scope, $rootScope, personsService) {

                    this.filter = '';
                    this.persons = [];

                    personsService.getAll().success(function (data) {
                        for (let i = 0; i < data.length; i++)
                            this.persons.push(new Person(data[i]));
                        $('#add-member-button').show();
                    }.bind(this));

                    this.indexOfMember = function (member) {
                        if (!member)
                            return -1;

                        let isNumber = typeof member == 'number';
                        let isPerson = member instanceof Person;

                        for (let i = 0; i < $scope.members.length; i++) {
                            if (isNumber && $scope.members[i].ID == member)
                                return i;
                            else if (isPerson && ($scope.members[i] == member || $scope.members[i].ID == member.ID))
                                return i;
                        }

                        return -1;
                    };

                    this.existMember = function (id) {
                        return this.indexOfMember(id) >= 0;
                    };

                    this.addMember = function (person) {
                        if (!person || this.existMember(person.ID))
                            return;

                        $scope.members.push(new Member(person));
                    };

                    this.removeMember = function (id) {
                        let index = this.indexOfMember(id);
                        while (index >= 0) {
                            $scope.members.splice(index, 1);
                            index = this.indexOfMember(id);
                        }
                    };
                }]
        };
    }]);
