'use strict';

angular.module('app')
    .controller('authController', ['$scope', '$rootScope', '$routeParams', 'personsService',
        function ($scope, $rootScope, $routeParams, personsService) {

            this.token = null;
            this.login = '';
            this.password = '';
            this.recoveryLogin = '';

            this.enter = function () {
                $scope.authService.login(this.login, this.password,
                    function () {
                        $rootScope.$broadcast('FamilyAuthentication');
                        $scope.navigationService.navigateToRoot();
                    }.bind(this),
                    function () {
                        this.login = '';
                        this.password = '';
                        $.snackbar({
                            style: 'error',
                            content: `Указан не верный логин или пароль!`,
                            timeout: 10000,
                            htmlAllowed: true
                        });
                    }.bind(this));
            };

            this.exit = function () {
                this.token = null;
                $scope.authService.logout();
                $scope.hideMenu();
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
                        style: 'success',
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
                $scope.hideMenu();
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

            this.passwordRecovery = function () {
                $scope.authService.recoveryInit(this.recoveryLogin)
                    .success(function () {
                        $.snackbar({
                            style: 'success',
                            content: `Вам на почту было отправлено письмо<br /> с дальнейшей информацией по восстановлению пароля!`,
                            timeout: 10000,
                            htmlAllowed: true
                        });
                    }.bind(this))
                    .error(function () {
                        $.snackbar({
                            style: 'error',
                            content: `Произошла какая-то ошибка!<br/>Видимо, ваш логин / email / телефон не найден в базе!`,
                            timeout: 10000,
                            htmlAllowed: true
                        });
                    }.bind(this))
                    .finally(function () {
                        this.recoveryLogin = '';
                    }.bind(this));
            };

            this.recoveryComplete = function () {
                if (!$routeParams.code) {
                    $.snackbar({
                        style: 'error',
                        content: `Указан не верный код восстановления пароля!`,
                        timeout: 10000,
                        htmlAllowed: true
                    });
                    $scope.navigationService.navigateToLogin();
                }
                else {
                    $scope.authService.recoveryComplete($routeParams.code)
                        .success(function () {
                            $.snackbar({
                                style: 'success',
                                content: `Пароль успешно восстановлен!<br />Вам на почту было отправлено письмо с новым паролем!`,
                                timeout: 10000,
                                htmlAllowed: true
                            });
                        }.bind(this))
                        .error(function () {
                            $.snackbar({
                                style: 'error',
                                content: `Произошла какая-то ошибка!<br/>Попробуйте восстановить пароль еще раз!`,
                                timeout: 10000,
                                htmlAllowed: true
                            });
                        }.bind(this))
                        .finally(function () {
                            $scope.navigationService.navigateToLogin();
                        }.bind(this));
                }
            };

            $scope.$on('FamilyAuthentication', this.reload.bind(this));

            $('.menu-link').on('click', function () {
                $scope.hideMenu();
            }).bind(this);

            $scope.hideMenu = function () {
                $('.navbar-collapse').collapse('hide');
            };
        }]);