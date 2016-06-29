'use strict';

var app = angular.module('app', ['ngRoute', 'ngImgCrop', 'LocalStorageModule', 'flow']);

app.config(['$compileProvider', '$routeProvider', 'localStorageServiceProvider',
    function ($compileProvider, $routeProvider, localStorageServiceProvider) {
        Date.prototype.toRussianString = function () {
            let year = this.getFullYear();
            let month = this.getMonth() + 1;
            if (month < 10)
                month = "0" + month.toString();
            let day = this.getDate();

            return day + '.' + month + '.' + year;
        };

        localStorageServiceProvider.setPrefix('ls.family');

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|skype|tel|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)

        $routeProvider.when('/', {
            templateUrl: 'app/views/person-list.view.html'
        }).when('/registration', {
            templateUrl: 'app/views/registration.view.html'
        }).when('/login', {
            templateUrl: 'app/views/login.view.html'
        }).when('/persons', {
            templateUrl: 'app/views/person-list.view.html'
        }).when('/persons/:id', {
            templateUrl: 'app/views/person-show.view.html'
        }).when('/edit/person/:id', {
            templateUrl: 'app/views/person-edit.view.html'
        }).when('/articles', {
            templateUrl: 'app/views/article-list.view.html'
        }).when('/articles/:id', {
            templateUrl: 'app/views/article-show.view.html'
        }).when('/edit/article/:id', {
            templateUrl: 'app/views/article-edit.view.html'
        }).otherwise({
            redirectTo: '/'
        });

    }
]);

app.run(['$rootScope', 'authService', 'navigationService',
    function ($rootScope, authService, navigationService) {
        // setup Token to headers
        authService.redefineHeaders();

        $rootScope.authService = authService;
        $rootScope.navigationService = navigationService;

        $rootScope.$on('$routeChangeStart', function (next, current) {
            $(document).find('.sxmg-panel').remove();
        });
    }]);

app.constant('URLS', {
    STORAGEURL:'https://familyarchivestorage.blob.core.windows.net/',
    IMAGES: {
        UNKNOWN: '/images/unknown.png'
        //AVATAR: '/JQFile/Avatar/'
    },
    API: {
        //BASE: 'http://localhost:62927/api/',
        BASE: 'http://api.family.litskevich.ru/api/',
        FILEUPLOAD: 'file/flow'
    }
});


