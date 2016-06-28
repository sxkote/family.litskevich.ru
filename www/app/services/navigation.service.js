angular.module('app')
    .factory('navigationService', ['URLS', '$location', 'authService',
        function (URLS, $location, authService) {
            return {
                modalClose: function (modalID) {
                    if (modalID)
                        $(modalID).modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                },
                navigateToRoot: function () {
                    $location.path('/');
                },
                navigateToLogin: function () {
                    $location.path('login');
                },
                navigateToRegistration: function () {
                    $location.path('registration');
                },
                navigateToPersonList: function () {
                    $location.path('persons/');
                },
                navigateToPersonShow: function (personID) {
                    if (!authService.isAuthenticated())
                        this.navigateToLogin();
                    else
                        $location.path('persons/' + personID);
                },
                navigateToPersonModify: function (personID) {
                    if (!authService.isAuthenticated())
                        this.navigateToLogin();
                    else if (authService.isRedactor())
                        $location.path('edit/person/' + personID);
                    else
                        this.navigateToRoot();
                },
                navigateToArticleList: function () {
                    if (!authService.isAuthenticated())
                        this.navigateToLogin();
                    else
                        $location.path('articles/');
                },
                navigateToArticleShow: function (articleID) {
                    if (!authService.isAuthenticated())
                        this.navigateToLogin();
                    else
                        $location.path('articles/' + articleID);
                },
                navigateToArticleModify: function (articleID) {
                    if (!authService.isAuthenticated())
                        this.navigateToLogin();
                    else if (authService.isRedactor())
                        $location.path('edit/article/' + articleID);
                    else
                        this.navigateToRoot();
                }
            };
        }]);