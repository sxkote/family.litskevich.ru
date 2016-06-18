angular.module('app')
    .factory('fileService', ['$http', 'URLS', 'authService',
        function ($http, URLS, authService) {
            return {
                // make (GUID) to differentiate uploads
                makeGuid: function () {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                    }

                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                },
                getBlob: function (code) {
                    return $http.get(URLS.API.BASE + 'file/' + code);
                },
                getBlobUrl: function (code) {
                    return $http.get(URLS.API.BASE + 'file/' + code + '/url');
                },
                getBlobAvatarUrl: function (code) {
                    let token = authService.getTokenKey();
                    return URLS.API.BASE + 'file/' + code + '/avatar?Token=' + token;
                },
                download: function (code) {
                    let token = authService.getTokenKey();
                    let url = URLS.API.BASE + 'file/' + code + '/content?Token=' + token;
                    $window.open(url);
                },
                transform: function (code, method, argument) {
                    let data = {'Method': method, 'Argument': argument};
                    return $http.post(URLS.API.BASE + 'file/' + code + '/transform', data);
                },
                rotate: function(code, clockwise){
                    return this.transform(code, 'rotate', clockwise ? 'true' : 'false');
                }
            };
        }]);