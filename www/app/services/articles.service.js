angular.module('app')
    .factory('articlesService', ['$http', 'authService', 'URLS',
        function ($http, authService, URLS) {
            return {
                getAll: function () {
                    return $http.get(URLS.API.BASE + 'article');
                },
                getAllByPerson: function (personID) {
                    return $http.get(URLS.API.BASE + 'person/' + personID + '/articles');
                },
                getByID: function (id) {
                    return $http.get(URLS.API.BASE + 'article/' + id);
                },
                createArticle: function (title) {
                    let data = {'Title': title};
                    return $http.post(URLS.API.BASE + 'article', data);
                },
                updateArticle: function (article) {
                    let personIDs = [];
                    if (article.Members && article.Members.length > 0)
                        for (let i = 0; i < article.Members.length; i++)
                            personIDs.push(article.Members[i].ID);

                    let data = {
                        'Title': article.Title,
                        'PeriodBegin': article.PeriodBegin,
                        'PeriodEnd': article.PeriodEnd,
                        'Comment': article.Comment,
                        'Persons': personIDs
                    };
                    return $http.post(URLS.API.BASE + 'article/' + article.ID, data);
                }
            };
        }]);