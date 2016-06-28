angular.module('app')
    .factory('materialsService', ['$http', 'authService', 'URLS',
        function ($http, authService, URLS) {
            return {
                createMaterial: function (articleID, fileCode) {
                    let data = {'ArticleID': articleID, 'FileCode': fileCode};
                    return $http.post(URLS.API.BASE + '/material', data);
                },
                updateMaterial: function (material) {
                    let data = {'Date': material.Date, 'Title': material.Title, 'Comment': material.Comment};
                    return $http.post(URLS.API.BASE + '/material/' + material.ID, data);
                },
                deleteMaterial: function (materialID) {
                    return $http.delete(URLS.API.BASE + '/material/' + materialID);
                },
                downloadMaterial: function (material) {
                    let url = this.getMaterialContentUrl(material);
                    $window.open(url);
                },
                transformMaterial: function (materialID, method, argument) {
                    let data = {'Method': method, 'Argument': argument};
                    return $http.post(URLS.API.BASE + '/material/' + materialID + '/transform', data);
                },
                rotateMaterial: function (materialID, clockwise) {
                    return this.transformMaterial(materialID, 'rotate', clockwise ? 'true' : 'false');
                },
                getMaterialUrl: function (url, extraParams) {
                    let extra = (extraParams == undefined || extraParams == null) ? '' : extraParams;
                    return URLS.STORAGEURL + url + authService.getSASToken() + extra;
                },
                getMaterialContentUrl: function (material, extraParams) {
                    if (material == undefined || material == null)
                        return null;

                    if (typeof material == 'string')
                        return this.getMaterialUrl(material, extraParams);

                    if (material instanceof Material)
                        return this.getMaterialUrl(material.Url, extraParams);

                    return null;
                },
                getMaterialThumbnailUrl: function (material, extraParams) {
                    if (material == undefined || material == null)
                        return null;

                    let suffix = '.thumbnail.jpg';

                    if (typeof material == 'string')
                        return this.getMaterialUrl(material + suffix, extraParams);

                    if (material instanceof Material)
                        return this.getMaterialUrl(material.Url + suffix, extraParams);

                    return null;
                }
            };
        }]);