angular.module('app')
    .factory('personsService', ['$http', 'URLS',
        function ($http, URLS) {
            return {
                getAll: function () {
                    return $http.get(URLS.API.BASE + 'person');
                },
                get: function (id) {
                    return $http.get(URLS.API.BASE + 'person/' + id);
                },
                createPerson: function(person){
                    return $http.post(URLS.API.BASE + 'person', person);
                },
                updatePerson: function(person){
                    return $http.post(URLS.API.BASE + 'person/' + person.ID, person);
                }
            };
        }]);