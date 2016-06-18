angular.module('app')
    .factory('navigationService', ['URLS', '$location', 'authService',
        function (URLS, $location, authService) {
            var isAuthenticated = authService.isAuthenticated();
            var isRedactor = authService.isRedactor();

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
                navigateToPersonList: function () {
                    $location.path('persons/');
                },
                navigateToPersonShow: function (personID) {
                    if (!isAuthenticated)
                        this.navigateToLogin();
                    else
                        $location.path('persons/' + personID);
                },
                navigateToPersonModify: function (personID) {
                    if (!isAuthenticated)
                        this.navigateToLogin();
                    else if (isRedactor)
                        $location.path('edit/person/' + personID);
                    else
                        this.navigateToRoot();
                },
                navigateToArticleList: function () {
                    if (!isAuthenticated)
                        this.navigateToLogin();
                    else
                        $location.path('articles/');
                },
                navigateToArticleShow: function (articleID) {
                    if (!isAuthenticated)
                        this.navigateToLogin();
                    else
                        $location.path('articles/' + articleID);
                },
                navigateToArticleModify: function (articleID) {
                    if (!isAuthenticated)
                        this.navigateToLogin();
                    else if (isRedactor)
                        $location.path('edit/article/' + articleID);
                    else
                        this.navigateToRoot();
                }
            };
        }]);