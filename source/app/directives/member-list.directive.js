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

                    this.existMember = function (member) {
                        return member && $scope.members.indexOf(member) >= 0;
                    };

                    this.addMember = function (member) {
                        if (!member || this.existMember(member))
                            return;

                        $scope.members.push(member);
                    };

                    this.removeMember = function (member) {
                        if (!member)
                            return;

                        let index = $scope.members.indexOf(member);
                        if (index < 0)
                            return;

                        $scope.members.splice(index, 1);
                    };
                }]
        };
    }]);
