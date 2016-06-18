angular.module('app')
    .factory('articlesService', ['$http', 'URLS',
        function ($http, URLS) {
            return {
                getAll: function () {
                    return $http.get(URLS.API.BASE + 'article');
                },
                getAllByPerson: function (personID) {
                    return $http.get(URLS.API.BASE + 'article/person/' + personID);
                },
                get: function (id) {
                    return $http.get(URLS.API.BASE + 'article/' + id);
                },
                createArticle: function (title) {
                    let data = {'Title': title};
                    return $http.post(URLS.API.BASE + 'article', data);
                },
                updateArticle: function (article) {
                    let personIDs = [];
                    if (article.Persons && article.Persons.length > 0)
                        for (let i = 0; i < article.Persons.length; i++)
                            personIDs.push(article.Persons[i].ID);

                    let data = {
                        'Title': article.Title,
                        'PeriodBegin': article.Period ? article.Period.Begin : null,
                        'PeriodEnd': article.Period ? article.Period.End : null,
                        'Comment': article.Comment,
                        'Persons': personIDs
                    };
                    return $http.post(URLS.API.BASE + 'article/' + article.ID, data);
                },
                addMaterial: function (articleID, fileCode) {
                    let data = {'Code': fileCode};
                    return $http.post(URLS.API.BASE + 'article/' + articleID + '/material', data);
                },
                updateMaterial: function (material) {
                    let data = {'Date': material.Date, 'Title': material.Title, 'Comment': material.Comment};
                    return $http.post(URLS.API.BASE + 'article/' + material.ArticleID + '/material/' + material.ID, data);
                },
                deleteMaterial: function (articleID, materialID) {
                    return $http.delete(URLS.API.BASE + 'article/' + articleID + '/material/' + materialID);
                }
            };
        }]);