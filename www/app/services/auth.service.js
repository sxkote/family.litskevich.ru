angular.module('app')
    .factory('authService', ['$http', 'URLS', 'localStorageService',
        function ($http, URLS, localStorageService) {
            return {
                setToken: function (token) {
                    localStorageService.set('token', token);
                },
                getToken: function () {
                    return new Token(localStorageService.get('token'));
                },
                getTokenKey: function () {
                    let token = this.getToken();
                    return (token && token.Key) ? token.Key : null;
                },
                removeToken: function () {
                    localStorageService.remove('token');
                },
                registration: function (registration) {
                    return $http.post(URLS.API.BASE + 'user/registration', registration);
                },
                login: function (login, password, onSuccess, onError) {

                    // auth request body to be send
                    var request = {'Login': login, 'Password': password};

                    return $http.post(URLS.API.BASE + 'auth', request)
                        .success(function (data) {
                            // set local storage variable
                            this.setToken(data);

                            // set auth header to all requests
                            this.redefineHeaders();

                            // continue with success
                            if (onSuccess) onSuccess(data);
                        }.bind(this))
                        .error(function (data, status) {
                            // remove local storage variable
                            this.removeToken();

                            // set auth header to null
                            this.redefineHeaders(null);

                            // continue with error
                            if (onError) onError(data, status);
                        }.bind(this));
                },
                logout: function () {
                    // remove local storage variable
                    this.removeToken();

                    // set auth header to null
                    this.redefineHeaders(null);
                },
                isAuthenticated: function () {
                    let token = this.getToken();
                    return token && token.isAuthenticated();
                },
                isInRole: function (role) {
                    let token = this.getToken();
                    return token && token.isInRole(role);
                },
                isRedactor: function () {
                    let token = this.getToken();
                    return token && token.isRedactor();
                },
                isAdmin: function () {
                    let token = this.getToken();
                    return token && token.isAdmin();
                },
                getSASToken:function(){
                    let token = this.getToken();
                    return token.getValue("sas") || '';
                },
                redefineHeaders: function (authorizationHeader) {
                    if (authorizationHeader == undefined) {
                        let key = this.getTokenKey();
                        authorizationHeader = (key) ? 'Token ' + key : null;
                    }

                    $http.defaults.headers.common['Authorization'] = authorizationHeader;
                }
            };
        }]);