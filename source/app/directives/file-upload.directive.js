angular.module('app')
    .directive('fileUpload', ['URLS',
        function (URLS) {
            return {
                restrict: 'AE',
                scope: {
                    fileCode: '=fileCode',
                    multipleFiles: '@multipleFiles',
                    fileUploaded: '&fileUploaded'
                },
                require: ['ngModel'],
                templateUrl: 'app/partials/file-upload.partial.html',
                controllerAs: 'vm',
                controller: ['$scope', '$element', 'authService', 'fileService', 'URLS',
                    function ($scope, $element, authService, fileService, URLS) {

                        this.blob = null;
                        this.isUploading = false;
                        this.uploadingFileName = '';

                        // generate new Flow instance to upload files
                        this.flow = new Flow({
                            target: URLS.API.BASE + URLS.API.FILEUPLOAD,
                            headers: {
                                'Authorization': 'Token ' + authService.getTokenKey()
                            },
                            query: {
                                'flowUploadID': fileService.makeGuid()
                            },
                            singleFile: !$scope.multipleFiles,
                            testChunks: false,
                            permanentErrors: [404, 500, 501],
                            //chunkSize: 512000,
                            maxChunkRetries: 1,
                            chunkRetryInterval: 5000,
                            simultaneousUploads: 1
                        });

                        this.flow.on('uploadStart', function () {
                            this.isUploading = true;
                        }.bind(this));

                        this.flow.on('complete', function () {
                            this.isUploading = false;
                            this.flow.files = [];
                        }.bind(this));

                        this.flow.on('fileProgress', function (file, chunk) {
                            this.uploadingFileName = file.name;
                        }.bind(this));

                        this.flow.on('fileSuccess', function (file, message, chunk) {
                            var fileBlob = JSON.parse(message);

                            if ($scope.fileUploaded)
                                $scope.fileUploaded({file: fileBlob});

                            if (!$scope.multipleFiles)
                                this.reload(fileBlob);
                        }.bind(this));


                        this.upload = function () {
                            this.flow.upload();
                        };

                        this.reload = function (fileBlob) {
                            if (fileBlob != undefined)
                                this.blob = fileBlob;
                            else if ($scope.fileCode)
                                fileService.getBlob($scope.fileCode).success(function (data) {
                                    this.blob = data;
                                }.bind(this));
                            else this.blob = null;
                        };

                        this.download = function () {
                            if ($scope.fileCode)
                                fileService.download($scope.fileCode);
                        };

                        $scope.inputFilesChanged = function () {
                            var files = $element.find('input[type=file]').get(0).files;
                            for (var i = 0; i < files.length; i++) {
                                this.flow.addFile(files[i]);
                            }
                            this.upload();
                        }.bind(this);

                        if (!$scope.multipleFiles)
                            this.reload();
                    }]
            };
        }]);