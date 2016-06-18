angular.module('app')
    .directive('avatarEditor', [function () {
        return {
            restrict: 'AE',
            scope: {
                avatar: '=avatarEditor'
            },
            templateUrl: 'app/partials/avatar-editor.partial.html',
            controllerAs: 'vm',
            controller: ['$scope', function ($scope) {

                $scope.avatarFile = null;
                $scope.avatarPreview = null;

                angular.element(document.querySelector('#avatarFile')).on('change', function (evt) {
                    var file = evt.currentTarget.files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.avatarFile = evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                });


                this.displayAvatarModal = function (show) {
                    angular.element(document.querySelector('#avatar-modal')).modal(show ? 'show' : 'hide');
                };

                this.cancel = function () {
                    this.displayAvatarModal(false);
                };

                this.apply = function () {
                    $scope.avatar = $scope.avatarPreview;
                    this.displayAvatarModal(false);
                };

            }]
        };
    }]);
