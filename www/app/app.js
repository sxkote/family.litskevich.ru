'use strict';

var app = angular.module('app', ['ngRoute', 'ngImgCrop', 'LocalStorageModule', 'flow']);

app.config(['$compileProvider', '$routeProvider', 'localStorageServiceProvider', function ($compileProvider, $routeProvider, localStorageServiceProvider) {
    Date.prototype.toRussianString = function () {
        var year = this.getFullYear();
        var month = this.getMonth() + 1;
        if (month < 10) month = "0" + month.toString();
        var day = this.getDate();

        return day + '.' + month + '.' + year;
    };

    localStorageServiceProvider.setPrefix('ls.family');

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|skype|tel|ftp|mailto|chrome-extension):/);
    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)

    $routeProvider.when('/', {
        templateUrl: 'app/views/person-list.view.html'
    }).when('/registration', {
        templateUrl: 'app/views/registration.view.html'
    }).when('/login', {
        templateUrl: 'app/views/login.view.html'
    }).when('/persons', {
        templateUrl: 'app/views/person-list.view.html'
    }).when('/persons/:id', {
        templateUrl: 'app/views/person-show.view.html'
    }).when('/edit/person/:id', {
        templateUrl: 'app/views/person-edit.view.html'
    }).when('/articles', {
        templateUrl: 'app/views/article-list.view.html'
    }).when('/articles/:id', {
        templateUrl: 'app/views/article-show.view.html'
    }).when('/edit/article/:id', {
        templateUrl: 'app/views/article-edit.view.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);

app.run(['$rootScope', 'authService', 'navigationService', function ($rootScope, authService, navigationService) {
    // setup Token to headers
    authService.redefineHeaders();

    $rootScope.authService = authService;
    $rootScope.navigationService = navigationService;

    $rootScope.$on('$routeChangeStart', function (next, current) {
        $(document).find('.sxmg-panel').remove();
    });
}]);

app.constant('URLS', {
    STORAGEURL: 'https://familyarchivestorage.blob.core.windows.net/',
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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Article = function () {
    function Article(obj, materialsService) {
        _classCallCheck(this, Article);

        this.Materials = [];
        this.Members = [];

        if (obj) {
            this.ID = obj.ID;

            this.Author = new Author(obj.Author);
            this.Date = new Date(obj.Date);

            this.Title = obj.Title;
            this.PeriodBegin = obj.PeriodBegin ? new Date(obj.PeriodBegin) : null;
            this.PeriodEnd = obj.PeriodEnd ? new Date(obj.PeriodEnd) : null;
            this.Comment = obj.Comment ? obj.Comment : '';

            if (obj.Materials && obj.Materials.length) for (var i = 0; i < obj.Materials.length; i++) {
                this.addMaterial(obj.Materials[i], materialsService);
            }if (obj.Members && obj.Members.length) for (var _i = 0; _i < obj.Members.length; _i++) {
                this.addMember(obj.Members[_i]);
            }
        } else {
            this.ID = 0;

            this.Author = null;
            this.Date = Date.now();

            this.Title = '';
            this.PeriodBegin = null;
            this.PeriodEnd = null;
            this.Comment = '';
        }

        this.Materials = this.Materials.sort(Material.Compare);
    }

    _createClass(Article, [{
        key: 'getDates',
        value: function getDates() {
            var result = '';

            if (this.PeriodBegin != null && this.PeriodBegin != undefined) result += this.PeriodBegin.toRussianString();

            if (this.PeriodEnd != null && this.PeriodEnd != undefined) result += ' - ' + this.PeriodEnd.toRussianString();

            return result;
        }
    }, {
        key: 'addMaterial',
        value: function addMaterial(material, materialsService) {
            this.Materials.push(new Material(material, materialsService));
        }
    }, {
        key: 'removeMaterial',
        value: function removeMaterial(material) {
            if (material == null || material == undefined) return;

            var index = this.Materials.indexOf(material);

            if (index >= 0) this.Materials.splice(index, 1);
        }
    }, {
        key: 'addMember',
        value: function addMember(member) {
            this.Members.push(new Member(member));
        }
    }, {
        key: 'removeMember',
        value: function removeMember(member) {
            if (member == null || member == undefined) return;

            var index = this.Members.indexOf(member);

            if (index >= 0) this.Members.splice(index, 1);
        }
    }, {
        key: 'match',
        value: function match(filter) {
            if (!filter || filter == '') return true;

            var text = this.Title + ' ' + this.Comment;

            var regex = new RegExp(filter, "i");
            if (text.search(regex) >= 0) return true;

            for (var i = 0; i < this.Members.length; i++) {
                if (this.Members[i].match(filter)) return true;
            } // search by year
            if (filter.search(/^\d{4}$/i) == 0) {
                var year = parseInt(filter);

                if (this.Date.getFullYear() == year) return true;

                if (this.PeriodBegin && this.PeriodBegin.getFullYear() == year) return true;

                if (this.PeriodEnd && this.PeriodEnd.getFullYear() == year) return true;
            }

            return false;
        }
    }]);

    return Article;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Author = function Author(obj) {
    _classCallCheck(this, Author);

    if (obj) {
        this.ID = obj.ID;
        this.Avatar = obj.Avatar;
        this.Name = obj.Name;
    } else {
        this.ID = 0;
        this.Avatar = null;
        this.Name = '';
    }
};
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guest = function Guest() {
    _classCallCheck(this, Guest);

    this.NameFirst = '';
    this.NameLast = '';
    this.Email = '';
    this.Phone = '';
    this.Login = 'guest';
    this.Password = '';
    this.Hours = 24;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ManagerRoleType = {
    User: 'User',
    Supervisor: 'Supervisor',
    Admin: 'Admin'
};

var Manager = function () {
    function Manager(obj) {
        _classCallCheck(this, Manager);

        this.login = '';
        this.password = '';
        this._roles = [];

        if (obj) {
            if (typeof obj == 'string') {
                this.login = obj;
            } else {
                this.login = obj.login;
                this.password = obj.password;
            }
        }

        //this.addRole(ManagerRoleType.User);
    }

    _createClass(Manager, [{
        key: 'inRole',
        value: function inRole(role) {
            if (role == undefined || role == null || role == '' || typeof role != 'string') return false;

            for (var i = 0; i < this.roles.length; i++) {
                if (this.roles[i].toLowerCase() == role.toLowerCase()) return true;
            }

            return false;
        }
    }, {
        key: 'addRole',
        value: function addRole(role) {
            if (role == undefined || role == null || role == '' || typeof role != 'string') return;

            if (!this.inRole(role)) this.roles.push(role);
        }
    }, {
        key: 'removeRole',
        value: function removeRole(role) {
            if (role == undefined || role == null || role == '' || typeof role != 'string') return;

            for (var i = this.roles.length - 1; i >= 0; i--) {
                if (this.roles[i].toLowerCase() == role.toLowerCase()) this.roles.splice(i, 1);
            }
        }
    }, {
        key: 'setRole',
        value: function setRole(role, flag) {
            if (role == undefined || role == null || role == '' || typeof role != 'string') return;

            if (flag) this.addRole(role);else this.removeRole(role);
        }
    }, {
        key: 'getRolesString',
        value: function getRolesString() {
            return this.roles.join(',');
        }
    }, {
        key: 'roles',
        get: function get() {
            if (this._roles == null || this._roles == undefined) {
                this._roles = [];
            }
            return this._roles;
        }
    }, {
        key: 'isUser',
        get: function get() {
            return this.inRole(ManagerRoleType.User);
        },
        set: function set(value) {
            this.setRole(ManagerRoleType.User, value);
        }
    }, {
        key: 'isSupervisor',
        get: function get() {
            return this.inRole(ManagerRoleType.Supervisor);
        },
        set: function set(value) {
            this.setRole(ManagerRoleType.Supervisor, value);
        }
    }, {
        key: 'isAdmin',
        get: function get() {
            return this.inRole(ManagerRoleType.Admin);
        },
        set: function set(value) {
            this.setRole(ManagerRoleType.Admin, value);
        }
    }]);

    return Manager;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialType = {
    File: 'File',
    Image: 'Image',
    Video: 'Video',
    Audio: 'Audio',
    PDF: 'PDF',
    Excel: 'Excel',
    Word: 'Word',
    PowerPoint: 'PowerPoint',
    Text: 'Text',
    ZIP: 'ZIP'
};

var Material = function () {
    function Material(obj, materialsService) {
        _classCallCheck(this, Material);

        if (obj) {
            this.ID = obj.ID;

            this.Type = obj.Type || '';
            this.Url = obj.Url || '';
            this.FileName = obj.FileName || '';

            this.Date = obj.Date ? new Date(obj.Date) : null;
            this.Title = obj.Title;
            this.Comment = obj.Comment ? obj.Comment : '';

            this.ContentUrl = obj.ContentUrl || '';
            this.ThumbnailUrl = obj.ThumbnailUrl || '';
        } else {
            this.ID = 0;
            this.ArticleID = 0;

            this.Type = '';
            this.Url = '';
            this.FileName = '';

            this.Date = null;
            this.Title = '';
            this.Comment = '';

            this.ContentUrl = '';
            this.ThumbnailUrl = '';
        }

        if (materialsService && this.Url) {
            this.ContentUrl = materialsService.getMaterialContentUrl(this.Url);
            this.ThumbnailUrl = materialsService.getMaterialThumbnailUrl(this.Url);
        }
    }

    /**
     * @return {number}
     */


    _createClass(Material, null, [{
        key: 'Compare',
        value: function Compare(a, b) {

            // if no Dates than compare by ID
            if (!a.Date && !b.Date) return a.ID - b.ID;

            // date B is not set, than B later than A
            if (!b.Date) return -1;

            // date A is not set, than A later than B
            if (!a.Date) return 1;

            if (a.Date < b.Date) return -1;

            if (a.Date > b.Date) return 1;

            return 0;
        }
    }]);

    return Material;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Member = function () {
    function Member(obj) {
        _classCallCheck(this, Member);

        if (obj) {
            this.ID = obj.ID;
            this.Avatar = obj.Avatar;

            if (obj instanceof Person) this.Name = obj.nameTotal;else this.Name = obj.Name;
        } else {
            this.ID = 0;
            this.Avatar = null;
            this.Name = '';
        }
    }

    _createClass(Member, [{
        key: 'match',
        value: function match(filter) {
            if (!filter || filter == '') return true;

            var regex = new RegExp(filter, "i");
            return this.Name.search(regex) >= 0;
        }
    }]);

    return Member;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
    function Person(obj) {
        _classCallCheck(this, Person);

        if (obj) {
            this.ID = obj.ID;
            this.Avatar = obj.Avatar;
            this.Name = obj.Name;
            this.Gender = obj.Gender;

            this.Email = obj.Email || '';
            this.Phone = obj.Phone || '';

            this.DateBirth = obj.DateBirth ? new Date(obj.DateBirth) : null;
            this.DateDeath = obj.DateDeath ? new Date(obj.DateDeath) : null;
        } else {
            this.ID = 0;
            this.Avatar = null;
            this.Name = { 'First': '', 'Last': '', 'Second': '', 'Maiden': '' };
            this.Gender = 1;
            this.Email = '';
            this.Phone = '';
            this.DateBirth = null;
            this.DateDeath = null;
        }
    }

    _createClass(Person, [{
        key: 'getNameFirstLine',
        value: function getNameFirstLine() {
            var maiden = this.Name.Maiden && this.Name.Maiden.length > 0 ? ' (' + this.Name.Maiden + ')' : '';
            return '' + this.Name.Last + maiden;
        }
    }, {
        key: 'getNameSecondLine',
        value: function getNameSecondLine() {
            return this.Name.First + ' ' + this.Name.Second;
        }
    }, {
        key: 'match',
        value: function match(filter) {
            if (!filter || filter == '') return true;

            var text = this.Name.First + ' ' + this.Name.Second + ' ' + this.Name.Last + ' ' + this.Name.Maiden;

            var regex = new RegExp(filter, "i");

            return text.search(regex) >= 0;
        }
    }, {
        key: 'getDates',
        value: function getDates() {
            var result = '';

            if (this.DateBirth != null && this.DateBirth != undefined) result += this.DateBirth.toRussianString();

            if (this.DateDeath != null && this.DateDeath != undefined) result += ' - ' + this.DateDeath.toRussianString();

            return result;
        }
    }, {
        key: 'nameFull',
        get: function get() {
            return this.Name.Last + ' ' + this.Name.First + ' ' + this.Name.Second;
        }
    }, {
        key: 'nameTotal',
        get: function get() {
            var maiden = this.Name.Maiden && this.Name.Maiden.length > 0 ? ' (' + this.Name.Maiden + ')' : '';
            return '' + this.Name.Last + maiden + ' ' + this.Name.First + ' ' + this.Name.Second;
        }
    }]);

    return Person;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
    function Token(obj) {
        _classCallCheck(this, Token);

        if (obj) {
            this.Key = obj.Key;
            this.Login = obj.Login;
            this.Name = obj.Name;
            this.Avatar = obj.Avatar;
            this.Expire = new Date(obj.Expire);
            this.Roles = obj.Roles;
            this.Values = obj.Values || [];
        } else {
            this.Key = null;
            this.Login = null;
            this.Name = { 'First': '', 'Last': '' };
            this.Avatar = null;
            this.Expire = null;
            this.Roles = [];
            this.Values = [];
        }
    }

    _createClass(Token, [{
        key: 'getValue',
        value: function getValue(name) {
            if (this.Values == undefined || this.Values == null || this.Values.length <= 0) return '';

            for (var i = 0; i < this.Values.length; i++) {
                if (this.Values[i].Name.toLowerCase() == name.toLowerCase()) return this.Values[i].Value || '';
            }return '';
        }
    }, {
        key: 'isAuthenticated',
        value: function isAuthenticated() {
            return this.Key && this.Key.length > 0 && this.Expire && this.Expire > Date.now();
        }
    }, {
        key: 'isInRole',
        value: function isInRole(role) {
            if (!this.isAuthenticated()) return false;

            return this.Roles && this.Roles.length > 0 && this.Roles.indexOf(role) >= 0;
        }
    }, {
        key: 'isAdmin',
        value: function isAdmin() {
            return this.isInRole(ManagerRoleType.Admin);
        }
    }, {
        key: 'isSupervisor',
        value: function isSupervisor() {
            return this.isInRole(ManagerRoleType.Supervisor);
        }
    }, {
        key: 'isRedactor',
        value: function isRedactor() {
            return this.isAdmin() || this.isSupervisor();
        }
    }]);

    return Token;
}();
'use strict';

angular.module('app').controller('articlesController', ['$scope', '$routeParams', '$element', 'articlesService', 'materialsService', function ($scope, $routeParams, $element, articlesService, materialsService) {

    if (!$scope.authService.isAuthenticated()) $scope.navigationService.navigateToLogin();

    this.articles = [];
    this.article = new Article();

    this.materialToDelete = null;
    this.materialToUpdate = null;

    this.reload = function (id) {
        if (id == undefined || id == null) id = $routeParams.id;

        if (id > 0) articlesService.getByID(id).success(function (data) {
            this.article = new Article(data, materialsService);
            this.reloadMediaGallery(this.article.Materials);
        }.bind(this));else this.article = new Article();
    };

    this.reloadAll = function () {
        articlesService.getAll().success(function (data) {
            for (var i = 0; i < data.length; i++) {
                this.articles.push(new Article(data[i], materialsService));
            }
        }.bind(this));
    };

    this.reloadAllByPerson = function (personID) {
        articlesService.getAllByPerson(personID).success(function (data) {
            for (var i = 0; i < data.length; i++) {
                this.articles.push(new Article(data[i], materialsService));
            }
        }.bind(this));
    };

    this.reloadMediaGallery = function (materials) {
        var items = [];
        for (var i = 0; i < materials.length; i++) {
            var material = materials[i];
            items.push({
                id: material.Url,
                type: material.Type,
                url: material.ContentUrl,
                thumbnail: material.ThumbnailUrl,
                filename: material.FileName,
                title: material.Title,
                date: material.Date,
                comment: material.Comment
            });
        }

        $element.find('.sxmg').sxMediaGallery({
            items: items
        });
    };

    this.createArticle = function () {
        $scope.navigationService.modalClose('#create-article-dialog');
        articlesService.createArticle(this.article.Title).success(function (data) {
            $scope.navigationService.navigateToArticleModify(data.ID);
        }.bind(this));
    };

    this.updateArticle = function () {
        if (this.article) {
            articlesService.updateArticle(this.article).success(function (data) {
                $scope.navigationService.navigateToArticleList();
            }.bind(this));
        }
    };

    this.fileUploaded = function (file) {
        if (this.article) {
            materialsService.createMaterial(this.article.ID, file.Code).success(function (data) {
                this.article.addMaterial(data, materialsService);
            }.bind(this));
        }
    };

    this.showDeleteMaterialDialog = function (material) {
        this.materialToDelete = material;
        $('#delete-material-dialog').modal('show');
    };

    this.showUpdateMaterialDialog = function (material) {
        this.materialToUpdate = material;
        $('#update-material-dialog').modal('show');
    };

    this.deleteMaterial = function () {
        if (this.materialToDelete) {
            materialsService.deleteMaterial(this.materialToDelete.ID).success(function () {
                this.article.removeMaterial(this.materialToDelete);
            }.bind(this)).finally(function () {
                this.materialToDelete = null;
            }.bind(this));
        }
    };

    this.updateMaterial = function () {
        if (this.materialToUpdate) {
            materialsService.updateMaterial(this.materialToUpdate);
            this.materialToUpdate = null;
        }
    };
}]);
'use strict';

angular.module('app').controller('authController', ['$scope', '$rootScope', 'personsService', function ($scope, $rootScope, personsService) {

    this.token = null;
    this.login = '';
    this.password = '';

    this.enter = function () {
        $scope.authService.login(this.login, this.password, function () {
            $rootScope.$broadcast('FamilyAuthentication');
            $scope.navigationService.navigateToRoot();
        }.bind(this));
    };

    this.exit = function () {
        this.token = null;
        $scope.authService.logout();
        $rootScope.navigationService.navigateToRoot();
    };

    this.reload = function () {
        this.token = $scope.authService.getToken();
    };

    this.registrationInit = function () {
        this.registration = {};
    };

    this.registrationComplete = function () {
        $scope.authService.registration(this.registration).success(function () {
            $.snackbar({
                content: 'Спасибо, Вы отправили запрос на регистрацию!<br>После рассмотрения, мы отправим Вам письмо (email) с дальнейшей информацией!',
                timeout: 10000,
                htmlAllowed: true
            });

            $scope.navigationService.navigateToRoot();
        }.bind(this));
    };

    this.showInviteGuestDialog = function () {
        this.guest = new Guest();
        $('#invite-guest-dialog').modal('show');
    };

    this.inviteGuest = function () {
        if (this.guest.Password != this.guest.PasswordConfirm) {
            $.snackbar({
                content: 'Указанные пароли не совпадают!',
                style: 'error',
                timeout: 5000,
                htmlAllowed: true
            });
        } else {
            personsService.inviteGuest(this.guest).success(function () {
                var guestInfo = 'Успешно приглашен новый гость с логином <strong>' + this.guest.Login + '</strong>.<br> ';
                var emailInfo = 'Ему на почту <strong>' + this.guest.Email + '</strong> было отправлено письмо с доступом к сайту!';
                var content = guestInfo + (this.guest.Email ? emailInfo : '');
                $.snackbar({
                    content: content,
                    timeout: 10000,
                    htmlAllowed: true
                });
                this.guest = null;
                $('#invite-guest-dialog').modal('hide');
            }.bind(this));
        }
    };

    $scope.$on('FamilyAuthentication', this.reload.bind(this));
}]);
'use strict';

angular.module('app').controller('personsController', ['$scope', '$routeParams', 'personsService', 'articlesService', function ($scope, $routeParams, personsService, articlesService) {

    this.persons = [];
    this.person = new Person();
    this.articles = [];

    var getPerson = function (data) {
        this.person = new Person(data);
    }.bind(this);

    var getPersons = function (data) {
        for (var i = 0; i < data.length; i++) {
            this.persons.push(new Person(data[i]));
        }
    }.bind(this);

    var getArticles = function (data) {
        for (var i = 0; i < data.length; i++) {
            this.articles.push(new Article(data[i]));
        }
    }.bind(this);

    this.reload = function (id) {
        if (id == undefined || id == null) id = $routeParams.id;

        if (id > 0) personsService.get(id).success(getPerson);else this.person = new Person();
    };

    this.reloadAll = function () {
        personsService.getAll().success(getPersons);
    };

    this.reloadWithArticles = function (id) {
        if (id == undefined || id == null) id = $routeParams.id;

        this.reload(id);

        articlesService.getAllByPerson(id).success(getArticles);
    };

    this.createPerson = function () {
        $scope.navigationService.modalClose('#create-person-dialog');

        if (!this.person) return;

        personsService.createPerson(this.person).success(function (data) {
            $scope.navigationService.navigateToPersonModify(data.ID);
        }.bind(this));
    };

    this.updatePerson = function () {
        if (!this.person) return;

        personsService.updatePerson(this.person).success(function () {
            $scope.navigationService.navigateToPersonList();
        }.bind(this));
    };

    this.showCreateManagerDialog = function () {
        if (!this.person || !$scope.authService.isAdmin()) return;

        this.manager = new Manager(this.person ? this.person.Email || '' : '');
        this.manager.addRole(ManagerRoleType.User);

        $('#create-manager-dialog').modal('show');

        if (this.person.Email == undefined || this.person.Email == null || this.person.Email == '') {
            $.snackbar({
                content: '<strong>Обратите внимение</strong>, что не указан E-mail,<br> на который нужно отправлять письмо с доступом!!!',
                timeout: 7000,
                htmlAllowed: true
            });
        }
    };

    this.createManager = function () {
        if (!$scope.authService.isAdmin()) return;

        personsService.createManager(this.person.ID, this.manager.login, this.manager.password, this.manager.getRolesString()).success(function () {
            $.snackbar({
                content: 'Создан новый пользователь с логином <strong>' + this.manager.login + '</strong>.<br> Ему на почту <strong>' + this.person.Email + '</strong> было отправлено письмо с доступом к сайту!',
                timeout: 10000,
                htmlAllowed: true
            });
            $('#create-manager-dialog').modal('hide');
        }.bind(this));
    };
}]);
'use strict';

angular.module('app').controller('Ctrl', function ($scope) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';

    var handleFileSelect = function handleFileSelect(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
});
'use strict';

angular.module('app').directive('articleCard', [function () {
    return {
        restrict: 'AE',
        scope: {
            article: '=article',
            classes: '@classes'
        },
        templateUrl: 'app/partials/article-card.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.authService = $rootScope.authService;
            $scope.navigationService = $rootScope.navigationService;

            this.smallComment = function () {
                if (!$scope.article || !$scope.article.Comment) return '';else if ($scope.article.Comment.length > 60) return $scope.article.Comment.substr(0, 60) + '...';else return $scope.article.Comment;
            };
        }]
    };
}]);
'use strict';

angular.module('app').directive('articleList', [function () {
    return {
        restrict: 'AE',
        scope: {
            articles: '=articles',
            filter: '@filter'
        },
        templateUrl: 'app/partials/article-list.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
            this.filter = '';

            this.isFilterVisible = true;
            if ($scope.filter === false || $scope.filter == "false" || $scope.filter == "none") this.isFilterVisible = false;else this.filter = $scope.filter;

            $scope.authService = $rootScope.authService;
            $scope.navigationService = $rootScope.navigationService;
        }]
    };
}]);
'use strict';

angular.module('app').directive('articleMaterial', [function () {
    return {
        restrict: 'AE',
        scope: {
            article: '=article',
            material: '=material',
            editMaterial: '&editMaterial',
            removeMaterial: '&removeMaterial'
        },
        require: ['ngModel'],
        templateUrl: 'app/partials/article-material.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', '$element', 'fileService', 'articlesService', 'materialsService', function ($scope, $element, fileService, articlesService, materialsService) {

            this.getUniqueThumbnailUrl = function () {
                //return articlesService.getMaterialThumbnailUrl($scope.material, '&guid=' + fileService.makeGuid());
                return $scope.material.ThumbnailUrl + '&guid=' + fileService.makeGuid();
            };

            $scope.thumbnailUrl = this.getUniqueThumbnailUrl();

            this.editMaterial = function () {
                if ($scope.editMaterial) $scope.editMaterial({ material: $scope.material });
            };

            this.removeMaterial = function () {
                if ($scope.removeMaterial) $scope.removeMaterial({ material: $scope.material });
            };

            this.rotateMaterial = function (clockwise) {
                return materialsService.rotateMaterial($scope.material.ID, clockwise).success(function () {
                    $scope.thumbnailUrl = this.getUniqueThumbnailUrl();
                }.bind(this));
            };
        }]
    };
}]);
'use strict';

angular.module('app').directive('avatarEditor', ['fileService', function (fileService) {
    return {
        restrict: 'AE',
        scope: {
            avatar: '=avatarEditor'
        },
        templateUrl: 'app/partials/avatar-editor.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', function ($scope) {
            $scope.fileService = fileService;

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
'use strict';

angular.module('app').directive('avatar', ['fileService', function (fileService) {
    return {
        restrict: 'AE',
        scope: {
            avatar: '=avatar',
            size: '@size',
            alternate: '@alternate',
            classes: '@classes',
            personID: '@personId'
        },
        templateUrl: 'app/partials/avatar.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.navigationService = $rootScope.navigationService;
            $scope.fileService = fileService;

            this.onClick = function ($event) {
                if ($scope.personID >= 0) {
                    $event.stopPropagation();
                    $scope.navigationService.navigateToPersonShow($scope.personID);
                }
            };
        }],
        link: function link(scope, element, attributes) {
            var image = element.find("img");

            var size = attributes.size;
            if (!size || size <= 0) size = 100;

            image.css({ width: size, height: size });

            image.attr('title', attributes.alternate);
            //image.attr('alt', attributes.alternate);

            image.tooltip();
        }
    };
}]);
'use strict';

angular.module('app').directive('fileUpload', ['URLS', function (URLS) {
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
        controller: ['$scope', 'authService', 'fileService', 'URLS', function ($scope, authService, fileService, URLS) {

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

                if ($scope.fileUploaded) $scope.fileUploaded({ file: fileBlob });

                if (!$scope.multipleFiles) this.reload(fileBlob);
            }.bind(this));

            this.upload = function () {
                this.flow.upload();
            };

            this.reload = function (fileBlob) {
                if (fileBlob != undefined) this.blob = fileBlob;else if ($scope.fileCode) fileService.getBlob($scope.fileCode).success(function (data) {
                    this.blob = data;
                }.bind(this));else this.blob = null;
            };

            this.download = function () {
                if ($scope.fileCode) fileService.download($scope.fileCode);
            };

            if (!$scope.multipleFiles) this.reload();
        }]
    };
}]);
'use strict';

angular.module('app').directive('memberList', [function () {
    return {
        restrict: 'AE',
        scope: {
            members: '=members'
        },
        templateUrl: 'app/partials/member-list.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', '$rootScope', 'personsService', function ($scope, $rootScope, personsService) {

            this.filter = '';
            this.persons = [];

            personsService.getAll().success(function (data) {
                for (var i = 0; i < data.length; i++) {
                    this.persons.push(new Person(data[i]));
                }$('#add-member-button').show();
            }.bind(this));

            this.indexOfMember = function (member) {
                if (!member) return -1;

                var isNumber = typeof member == 'number';
                var isPerson = member instanceof Person;

                for (var i = 0; i < $scope.members.length; i++) {
                    if (isNumber && $scope.members[i].ID == member) return i;else if (isPerson && ($scope.members[i] == member || $scope.members[i].ID == member.ID)) return i;
                }

                return -1;
            };

            this.existMember = function (id) {
                return this.indexOfMember(id) >= 0;
            };

            this.addMember = function (person) {
                if (!person || this.existMember(person.ID)) return;

                $scope.members.push(new Member(person));
            };

            this.removeMember = function (id) {
                var index = this.indexOfMember(id);
                while (index >= 0) {
                    $scope.members.splice(index, 1);
                    index = this.indexOfMember(id);
                }
            };
        }]
    };
}]);
'use strict';

angular.module('app').directive('personCard', [function () {
    return {
        restrict: 'AE',
        scope: {
            person: '=person',
            classes: '@classes'
        },
        templateUrl: 'app/partials/person-card.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.authService = $rootScope.authService;
            $scope.navigationService = $rootScope.navigationService;
        }]
    };
}]);
'use strict';

angular.module('app').directive('personList', [function () {
    return {
        restrict: 'AE',
        scope: {
            persons: '=persons'
        },
        templateUrl: 'app/partials/person-list.partial.html',
        controllerAs: 'vm',
        controller: ['$scope', function ($scope) {
            this.filter = '';
        }]
    };
}]);
'use strict';

angular.module('app').filter('articleSearch', function () {
    return function (input, search) {
        var out = [];

        if (input && input.length) {

            for (var i = 0; i < input.length; i++) {
                var article = new Article(input[i]);

                if (article.match(search)) out.push(input[i]);
            }
        }

        return out;
    };
});
'use strict';

angular.module('app').filter('personSearch', function () {
    return function (input, search) {
        var out = [];

        if (input && input.length) {
            for (var i = 0; i < input.length; i++) {
                var person = new Person(input[i]);

                if (person.match(search)) out.push(input[i]);
            }
        }

        return out;
    };
});
'use strict';

angular.module('app').factory('articlesService', ['$http', 'authService', 'URLS', function ($http, authService, URLS) {
    return {
        getAll: function getAll() {
            return $http.get(URLS.API.BASE + 'article');
        },
        getAllByPerson: function getAllByPerson(personID) {
            return $http.get(URLS.API.BASE + 'person/' + personID + '/articles');
        },
        getByID: function getByID(id) {
            return $http.get(URLS.API.BASE + 'article/' + id);
        },
        createArticle: function createArticle(title) {
            var data = { 'Title': title };
            return $http.post(URLS.API.BASE + 'article', data);
        },
        updateArticle: function updateArticle(article) {
            var personIDs = [];
            if (article.Members && article.Members.length > 0) for (var i = 0; i < article.Members.length; i++) {
                personIDs.push(article.Members[i].ID);
            }var data = {
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
'use strict';

angular.module('app').factory('authService', ['$http', 'URLS', 'localStorageService', function ($http, URLS, localStorageService) {
    return {
        setToken: function setToken(token) {
            localStorageService.set('token', token);
        },
        getToken: function getToken() {
            return new Token(localStorageService.get('token'));
        },
        getTokenKey: function getTokenKey() {
            var token = this.getToken();
            return token && token.Key ? token.Key : null;
        },
        removeToken: function removeToken() {
            localStorageService.remove('token');
        },
        registration: function registration(_registration) {
            return $http.post(URLS.API.BASE + 'user/registration', _registration);
        },
        login: function login(_login, password, onSuccess, onError) {

            // auth request body to be send
            var request = { 'Login': _login, 'Password': password };

            return $http.post(URLS.API.BASE + 'auth', request).success(function (data) {
                // set local storage variable
                this.setToken(data);

                // set auth header to all requests
                this.redefineHeaders();

                // continue with success
                if (onSuccess) onSuccess(data);
            }.bind(this)).error(function (data, status) {
                // remove local storage variable
                this.removeToken();

                // set auth header to null
                this.redefineHeaders(null);

                // continue with error
                if (onError) onError(data, status);
            }.bind(this));
        },
        logout: function logout() {
            // remove local storage variable
            this.removeToken();

            // set auth header to null
            this.redefineHeaders(null);
        },
        isAuthenticated: function isAuthenticated() {
            var token = this.getToken();
            return token && token.isAuthenticated();
        },
        isInRole: function isInRole(role) {
            var token = this.getToken();
            return token && token.isInRole(role);
        },
        isRedactor: function isRedactor() {
            var token = this.getToken();
            return token && token.isRedactor();
        },
        isAdmin: function isAdmin() {
            var token = this.getToken();
            return token && token.isAdmin();
        },
        getSASToken: function getSASToken() {
            var token = this.getToken();
            return token.getValue("sas") || '';
        },
        redefineHeaders: function redefineHeaders(authorizationHeader) {
            if (authorizationHeader == undefined) {
                var key = this.getTokenKey();
                authorizationHeader = key ? 'Token ' + key : null;
            }

            $http.defaults.headers.common['Authorization'] = authorizationHeader;
        }
    };
}]);
'use strict';

angular.module('app').factory('fileService', ['$http', 'URLS', 'authService', function ($http, URLS, authService) {
    return {
        // make (GUID) to differentiate uploads
        makeGuid: function makeGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        //getServerUrl: function (url) {
        //    if (url.startsWith('~') || url.startsWith('/')) {
        //        let token = authService.getTokenKey();
        //        return URLS.API.SERVER + url.replace(/^~?\/?/, '') + '?Token=' + token;
        //    }
        //    else return url;
        //},
        getAvatarSrc: function getAvatarSrc(avatar) {
            if (avatar == undefined || avatar == null || avatar == '') return './images/avatar.jpg';

            if (avatar.startsWith('data:')) return avatar;

            return URLS.API.BASE + 'avatar/' + avatar;
        },
        getBlob: function getBlob(code) {
            return $http.get(URLS.API.BASE + 'file/' + code);
        },
        //getBlobUrl: function (code) {
        //    return $http.get(URLS.API.BASE + 'file/' + code + '/url');
        //},
        //getBlobContentUrl: function (code) {
        //    let token = authService.getTokenKey();
        //    return URLS.API.BASE + 'file/' + code + '/content?Token=' + token;
        //},
        //getBlobAvatarUrl: function (code) {
        //    let token = authService.getTokenKey();
        //    if (!token)
        //        return;
        //    return URLS.API.BASE + 'file/' + code + '/avatar?Token=' + token;
        //},
        download: function download(code) {
            var token = authService.getTokenKey();
            var url = URLS.API.BASE + 'file/' + code + '/content?Token=' + token;
            $window.open(url);
        }
    };
}]);
'use strict';

angular.module('app').factory('materialsService', ['$http', 'authService', 'URLS', function ($http, authService, URLS) {
    return {
        createMaterial: function createMaterial(articleID, fileCode) {
            var data = { 'ArticleID': articleID, 'FileCode': fileCode };
            return $http.post(URLS.API.BASE + '/material', data);
        },
        updateMaterial: function updateMaterial(material) {
            var data = { 'Date': material.Date, 'Title': material.Title, 'Comment': material.Comment };
            return $http.post(URLS.API.BASE + '/material/' + material.ID, data);
        },
        deleteMaterial: function deleteMaterial(materialID) {
            return $http.delete(URLS.API.BASE + '/material/' + materialID);
        },
        downloadMaterial: function downloadMaterial(material) {
            var url = this.getMaterialContentUrl(material);
            $window.open(url);
        },
        transformMaterial: function transformMaterial(materialID, method, argument) {
            var data = { 'Method': method, 'Argument': argument };
            return $http.post(URLS.API.BASE + '/material/' + materialID + '/transform', data);
        },
        rotateMaterial: function rotateMaterial(materialID, clockwise) {
            return this.transformMaterial(materialID, 'rotate', clockwise ? 'true' : 'false');
        },
        getMaterialUrl: function getMaterialUrl(url, extraParams) {
            var extra = extraParams == undefined || extraParams == null ? '' : extraParams;
            return URLS.STORAGEURL + url + authService.getSASToken() + extra;
        },
        getMaterialContentUrl: function getMaterialContentUrl(material, extraParams) {
            if (material == undefined || material == null) return null;

            if (typeof material == 'string') return this.getMaterialUrl(material, extraParams);

            if (material instanceof Material) return this.getMaterialUrl(material.Url, extraParams);

            return null;
        },
        getMaterialThumbnailUrl: function getMaterialThumbnailUrl(material, extraParams) {
            if (material == undefined || material == null) return null;

            var suffix = '.thumbnail.jpg';

            if (typeof material == 'string') return this.getMaterialUrl(material + suffix, extraParams);

            if (material instanceof Material) return this.getMaterialUrl(material.Url + suffix, extraParams);

            return null;
        }
    };
}]);
'use strict';

angular.module('app').factory('navigationService', ['URLS', '$location', 'authService', function (URLS, $location, authService) {
    return {
        modalClose: function modalClose(modalID) {
            if (modalID) $(modalID).modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        },
        navigateToRoot: function navigateToRoot() {
            $location.path('/');
        },
        navigateToLogin: function navigateToLogin() {
            $location.path('login');
        },
        navigateToRegistration: function navigateToRegistration() {
            $location.path('registration');
        },
        navigateToPersonList: function navigateToPersonList() {
            $location.path('persons/');
        },
        navigateToPersonShow: function navigateToPersonShow(personID) {
            if (!authService.isAuthenticated()) this.navigateToLogin();else $location.path('persons/' + personID);
        },
        navigateToPersonModify: function navigateToPersonModify(personID) {
            if (!authService.isAuthenticated()) this.navigateToLogin();else if (authService.isRedactor()) $location.path('edit/person/' + personID);else this.navigateToRoot();
        },
        navigateToArticleList: function navigateToArticleList() {
            if (!authService.isAuthenticated()) this.navigateToLogin();else $location.path('articles/');
        },
        navigateToArticleShow: function navigateToArticleShow(articleID) {
            if (!authService.isAuthenticated()) this.navigateToLogin();else $location.path('articles/' + articleID);
        },
        navigateToArticleModify: function navigateToArticleModify(articleID) {
            if (!authService.isAuthenticated()) this.navigateToLogin();else if (authService.isRedactor()) $location.path('edit/article/' + articleID);else this.navigateToRoot();
        }
    };
}]);
'use strict';

angular.module('app').factory('personsService', ['$http', 'URLS', 'authService', function ($http, URLS, authService) {
    return {
        getAll: function getAll() {
            return $http.get(URLS.API.BASE + 'person');
        },
        get: function get(id) {
            return $http.get(URLS.API.BASE + 'person/' + id);
        },
        createPerson: function createPerson(person) {
            var data = { 'Name': person.Name };
            return $http.post(URLS.API.BASE + 'person', data);
        },
        updatePerson: function updatePerson(person) {
            var data = {
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
        createManager: function createManager(personID, login, password, roles) {
            if (!authService.isAdmin()) throw new Error('Только администраторы могут создавать пользователей!');

            var data = {
                Login: login,
                Password: password || '',
                Roles: roles || 'User'
            };
            return $http.post(URLS.API.BASE + 'person/' + personID + '/manager', data);
        },
        inviteGuest: function inviteGuest(guest) {
            return $http.post(URLS.API.BASE + 'person/invite', guest);
        }
    };
}]);