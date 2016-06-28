'use strict';

angular.module('app')
    .controller('authController', ['$scope', '$rootScope', 'personsService',
        function ($scope, $rootScope, personsService) {

            this.token = null;
            this.login = '';
            this.password = '';

            this.enter = function () {
                $scope.authService.login(this.login, this.password, function () {
                    $rootScope.$broadcast('FamilyAuthentication');
                    $scope.navigationService.navigateToRoot();
                }.bind(this));
            };

            this.exit = function () {
                this.token = null;
                $scope.authService.logout();
                $rootScope.navigationService.navigateToRoot();
            };

            this.reload = function () {
                this.token = $scope.authService.getToken();
            };

            this.registrationInit = function () {
                this.registration = {};
            };

            this.registrationComplete = function () {
                $scope.authService.registration(this.registration).success(function () {
                    $.snackbar({
                        content: `Спасибо, Вы отправили запрос на регистрацию!<br>После рассмотрения, мы отправим Вам письмо (email) с дальнейшей информацией!`,
                        timeout: 10000,
                        htmlAllowed: true
                    });

                    $scope.navigationService.navigateToRoot();
                }.bind(this));
            };

            this.showInviteGuestDialog = function () {
                this.guest = new Guest();
                $('#invite-guest-dialog').modal('show');
            };

            this.inviteGuest = function () {
                if (this.guest.Password != this.guest.PasswordConfirm) {
                    $.snackbar({
                        content: `Указанные пароли не совпадают!`,
                        style: 'error',
                        timeout: 5000,
                        htmlAllowed: true
                    });
                }
                else {
                    personsService.inviteGuest(this.guest).success(function () {
                        let guestInfo = `Успешно приглашен новый гость с логином <strong>${this.guest.Login}</strong>.<br> `;
                        let emailInfo = `Ему на почту <strong>${this.guest.Email}</strong> было отправлено письмо с доступом к сайту!`;
                        let content = guestInfo + ((this.guest.Email) ? emailInfo : '');
                        $.snackbar({
                            content: content,
                            timeout: 10000,
                            htmlAllowed: true
                        });
                        this.guest = null;
                        $('#invite-guest-dialog').modal('hide');
                    }.bind(this));
                }
            };

            $scope.$on('FamilyAuthentication', this.reload.bind(this));
        }]);