'use strict';

var app = angular.module('app', ['ngRoute']); //, 'ngImgCrop', 'LocalStorageModule', 'flow'

app.config(['$compileProvider', '$routeProvider', //'localStorageServiceProvider',
    function ($compileProvider, $routeProvider) { //, localStorageServiceProvider
        //Date.prototype.toRussianString = function () {
        //    let year = this.getFullYear();
        //    let month = this.getMonth() + 1;
        //    if (month < 10)
        //        month = "0" + month.toString();
        //    let day = this.getDate();
        //
        //    return day + '.' + month + '.' + year;
        //};

        //localStorageServiceProvider.setPrefix('ls.family');

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|skype|tel|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

app.run(['$rootScope', //'authService', 'navigationService',
    function ($rootScope) { //, authService, navigationService
        // setup Token to headers
        //authService.redefineHeaders();

        //$rootScope.authService = authService;
        //$rootScope.navigationService = navigationService;

        //$rootScope.$on('$routeChangeStart', function (next, current) {
        //    $(document).find('.sxmg-panel').remove();
        //});

        //var token = localStorageService.get('token');
        //if (token != null)
        //    $http.defaults.headers.common['Authorization'] = 'Token ' + token.Key;

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


