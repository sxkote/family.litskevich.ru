'use strict';

angular.module('app')
    .controller('authController', ['$scope',
        function ($scope) {

            this.token = null;
            this.login = '';
            this.password = '';

            this.enter = function () {
                $scope.authService.login(this.login, this.password, function () {
                    $scope.navigationService.navigateToRoot();
                });
            };

            this.exit = function () {
                this.token = null;
                $scope.authService.logout();
                $scope.navigationService.navigateToRoot();
            };

            this.reload = function () {
                this.token = $scope.authService.getToken();
            };
        }]);