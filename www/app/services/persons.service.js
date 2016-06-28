angular.module('app')
    .factory('personsService', ['$http', 'URLS', 'authService',
        function ($http, URLS, authService) {
            return {
                getAll: function () {
                    return $http.get(URLS.API.BASE + 'person');
                },
                get: function (id) {
                    return $http.get(URLS.API.BASE + 'person/' + id);
                },
                createPerson: function (person) {
                    let data = {'Name': person.Name};
                    return $http.post(URLS.API.BASE + 'person', data);
                },
                updatePerson: function (person) {
                    let data =
                    {
                        Name: person.Name,
                        Gender: person.Gender,
                        Avatar: person.Avatar,
                        Email: person.Email,
                        Phone: person.Phone,
                        DateBirth: person.DateBirth,
                        DateDeath: person.DateDeath
                    };
                    return $http.post(URLS.API.BASE + 'person/' + person.ID, data);
                },
                createManager: function (personID, login, password, roles) {
                    if (!authService.isAdmin())
                        throw new Error('Только администраторы могут создавать пользователей!');

                    let data = {
                        Login: login,
                        Password: password || '',
                        Roles: roles || 'User'
                    };
                    return $http.post(URLS.API.BASE + 'person/' + personID + '/manager', data);
                },
                inviteGuest: function(guest) {
                   return $http.post(URLS.API.BASE + 'person/invite', guest);
                }
            };
        }]);