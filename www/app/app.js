"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),app=angular.module("app",["ngRoute","ngImgCrop","LocalStorageModule","flow"]);app.config(["$compileProvider","$routeProvider","localStorageServiceProvider",function(e,t,i){Date.prototype.toRussianString=function(){var e=this.getFullYear(),t=this.getMonth()+1;t<10&&(t="0"+t.toString());var i=this.getDate();return i+"."+t+"."+e},i.setPrefix("ls.family"),e.aHrefSanitizationWhitelist(/^\s*(https?|skype|tel|ftp|mailto|chrome-extension):/),t.when("/",{templateUrl:"app/views/person-list.view.html"}).when("/registration",{templateUrl:"app/views/registration.view.html"}).when("/login",{templateUrl:"app/views/login.view.html"}).when("/persons",{templateUrl:"app/views/person-list.view.html"}).when("/persons/:id",{templateUrl:"app/views/person-show.view.html"}).when("/edit/person/:id",{templateUrl:"app/views/person-edit.view.html"}).when("/articles",{templateUrl:"app/views/article-list.view.html"}).when("/articles/:id",{templateUrl:"app/views/article-show.view.html"}).when("/edit/article/:id",{templateUrl:"app/views/article-edit.view.html"}).otherwise({redirectTo:"/"})}]),app.run(["$rootScope","authService","navigationService",function(e,t,i){t.redefineHeaders(),e.authService=t,e.navigationService=i,e.$on("$routeChangeStart",function(e,t){$(document).find(".sxmg-panel").remove()})}]),app.constant("URLS",{STORAGEURL:"https://familyarchivestorage.blob.core.windows.net/",IMAGES:{UNKNOWN:"/images/unknown.png"},API:{BASE:"http://api.family.litskevich.ru/api/",FILEUPLOAD:"file/flow"}});var Article=function(){function e(t,i){if(_classCallCheck(this,e),this.Materials=[],this.Members=[],t){if(this.ID=t.ID,this.Author=new Author(t.Author),this.Date=new Date(t.Date),this.Title=t.Title,this.PeriodBegin=t.PeriodBegin?new Date(t.PeriodBegin):null,this.PeriodEnd=t.PeriodEnd?new Date(t.PeriodEnd):null,this.Comment=t.Comment?t.Comment:"",t.Materials&&t.Materials.length)for(var n=0;n<t.Materials.length;n++)this.addMaterial(t.Materials[n],i);if(t.Members&&t.Members.length)for(var r=0;r<t.Members.length;r++)this.addMember(t.Members[r])}else this.ID=0,this.Author=null,this.Date=Date.now(),this.Title="",this.PeriodBegin=null,this.PeriodEnd=null,this.Comment="";this.Materials=this.Materials.sort(Material.Compare)}return _createClass(e,[{key:"getDates",value:function(){var e="";return null!=this.PeriodBegin&&void 0!=this.PeriodBegin&&(e+=this.PeriodBegin.toRussianString()),null!=this.PeriodEnd&&void 0!=this.PeriodEnd&&(e+=" - "+this.PeriodEnd.toRussianString()),e}},{key:"addMaterial",value:function(e,t){this.Materials.push(new Material(e,t))}},{key:"removeMaterial",value:function(e){if(null!=e&&void 0!=e){var t=this.Materials.indexOf(e);t>=0&&this.Materials.splice(t,1)}}},{key:"addMember",value:function(e){this.Members.push(new Member(e))}},{key:"removeMember",value:function(e){if(null!=e&&void 0!=e){var t=this.Members.indexOf(e);t>=0&&this.Members.splice(t,1)}}},{key:"match",value:function(e){if(!e||""==e)return!0;var t=this.Title+" "+this.Comment,i=new RegExp(e,"i");if(t.search(i)>=0)return!0;for(var n=0;n<this.Members.length;n++)if(this.Members[n].match(e))return!0;if(0==e.search(/^\d{4}$/i)){var r=parseInt(e);if(this.Date.getFullYear()==r)return!0;if(this.PeriodBegin&&this.PeriodBegin.getFullYear()==r)return!0;if(this.PeriodEnd&&this.PeriodEnd.getFullYear()==r)return!0}return!1}}]),e}(),Author=function e(t){_classCallCheck(this,e),t?(this.ID=t.ID,this.Avatar=t.Avatar,this.Name=t.Name):(this.ID=0,this.Avatar=null,this.Name="")},Guest=function t(){_classCallCheck(this,t),this.NameFirst="",this.NameLast="",this.Email="",this.Phone="",this.Login="guest",this.Password="",this.Hours=24},ManagerRoleType={User:"User",Supervisor:"Supervisor",Admin:"Admin"},Manager=function(){function e(t){_classCallCheck(this,e),this.login="",this.password="",this._roles=[],t&&("string"==typeof t?this.login=t:(this.login=t.login,this.password=t.password))}return _createClass(e,[{key:"inRole",value:function(e){if(void 0==e||null==e||""==e||"string"!=typeof e)return!1;for(var t=0;t<this.roles.length;t++)if(this.roles[t].toLowerCase()==e.toLowerCase())return!0;return!1}},{key:"addRole",value:function(e){void 0!=e&&null!=e&&""!=e&&"string"==typeof e&&(this.inRole(e)||this.roles.push(e))}},{key:"removeRole",value:function(e){if(void 0!=e&&null!=e&&""!=e&&"string"==typeof e)for(var t=this.roles.length-1;t>=0;t--)this.roles[t].toLowerCase()==e.toLowerCase()&&this.roles.splice(t,1)}},{key:"setRole",value:function(e,t){void 0!=e&&null!=e&&""!=e&&"string"==typeof e&&(t?this.addRole(e):this.removeRole(e))}},{key:"getRolesString",value:function(){return this.roles.join(",")}},{key:"roles",get:function(){return null!=this._roles&&void 0!=this._roles||(this._roles=[]),this._roles}},{key:"isUser",get:function(){return this.inRole(ManagerRoleType.User)},set:function(e){this.setRole(ManagerRoleType.User,e)}},{key:"isSupervisor",get:function(){return this.inRole(ManagerRoleType.Supervisor)},set:function(e){this.setRole(ManagerRoleType.Supervisor,e)}},{key:"isAdmin",get:function(){return this.inRole(ManagerRoleType.Admin)},set:function(e){this.setRole(ManagerRoleType.Admin,e)}}]),e}(),MaterialType={File:"File",Image:"Image",Video:"Video",Audio:"Audio",PDF:"PDF",Excel:"Excel",Word:"Word",PowerPoint:"PowerPoint",Text:"Text",ZIP:"ZIP"},Material=function(){function e(t,i){_classCallCheck(this,e),t?(this.ID=t.ID,this.Type=t.Type||"",this.Url=t.Url||"",this.FileName=t.FileName||"",this.Date=t.Date?new Date(t.Date):null,this.Title=t.Title,this.Comment=t.Comment?t.Comment:"",this.ContentUrl=t.ContentUrl||"",this.ThumbnailUrl=t.ThumbnailUrl||""):(this.ID=0,this.ArticleID=0,this.Type="",this.Url="",this.FileName="",this.Date=null,this.Title="",this.Comment="",this.ContentUrl="",this.ThumbnailUrl=""),i&&this.Url&&(this.ContentUrl=i.getMaterialContentUrl(this.Url),this.ThumbnailUrl=i.getMaterialThumbnailUrl(this.Url))}return _createClass(e,null,[{key:"Compare",value:function(e,t){return e.Date||t.Date?t.Date?e.Date?e.Date<t.Date?-1:e.Date>t.Date?1:0:1:-1:e.ID-t.ID}}]),e}(),Member=function(){function e(t){_classCallCheck(this,e),t?(this.ID=t.ID,this.Avatar=t.Avatar,t instanceof Person?this.Name=t.nameTotal:this.Name=t.Name):(this.ID=0,this.Avatar=null,this.Name="")}return _createClass(e,[{key:"match",value:function(e){if(!e||""==e)return!0;var t=new RegExp(e,"i");return this.Name.search(t)>=0}}]),e}(),Person=function(){function e(t){_classCallCheck(this,e),t?(this.ID=t.ID,this.Avatar=t.Avatar,this.Name=t.Name,this.Gender=t.Gender,this.Email=t.Email||"",this.Phone=t.Phone||"",this.DateBirth=t.DateBirth?new Date(t.DateBirth):null,this.DateDeath=t.DateDeath?new Date(t.DateDeath):null):(this.ID=0,this.Avatar=null,this.Name={First:"",Last:"",Second:"",Maiden:""},this.Gender=1,this.Email="",this.Phone="",this.DateBirth=null,this.DateDeath=null)}return _createClass(e,[{key:"getNameFirstLine",value:function(){var e=this.Name.Maiden&&this.Name.Maiden.length>0?" ("+this.Name.Maiden+")":"";return""+this.Name.Last+e}},{key:"getNameSecondLine",value:function(){return this.Name.First+" "+this.Name.Second}},{key:"match",value:function(e){if(!e||""==e)return!0;var t=this.Name.First+" "+this.Name.Second+" "+this.Name.Last+" "+this.Name.Maiden,i=new RegExp(e,"i");return t.search(i)>=0}},{key:"getDates",value:function(){var e="";return null!=this.DateBirth&&void 0!=this.DateBirth&&(e+=this.DateBirth.toRussianString()),null!=this.DateDeath&&void 0!=this.DateDeath&&(e+=" - "+this.DateDeath.toRussianString()),e}},{key:"nameFull",get:function(){return this.Name.Last+" "+this.Name.First+" "+this.Name.Second}},{key:"nameTotal",get:function(){var e=this.Name.Maiden&&this.Name.Maiden.length>0?" ("+this.Name.Maiden+")":"";return""+this.Name.Last+e+" "+this.Name.First+" "+this.Name.Second}}]),e}(),Token=function(){function e(t){_classCallCheck(this,e),t?(this.Key=t.Key,this.Login=t.Login,this.Name=t.Name,this.Avatar=t.Avatar,this.Expire=new Date(t.Expire),this.Roles=t.Roles,this.Values=t.Values||[]):(this.Key=null,this.Login=null,this.Name={First:"",Last:""},this.Avatar=null,this.Expire=null,this.Roles=[],this.Values=[])}return _createClass(e,[{key:"getValue",value:function(e){if(void 0==this.Values||null==this.Values||this.Values.length<=0)return"";for(var t=0;t<this.Values.length;t++)if(this.Values[t].Name.toLowerCase()==e.toLowerCase())return this.Values[t].Value||"";return""}},{key:"isAuthenticated",value:function(){return this.Key&&this.Key.length>0&&this.Expire&&this.Expire>Date.now()}},{key:"isInRole",value:function(e){return!!this.isAuthenticated()&&(this.Roles&&this.Roles.length>0&&this.Roles.indexOf(e)>=0)}},{key:"isAdmin",value:function(){return this.isInRole(ManagerRoleType.Admin)}},{key:"isSupervisor",value:function(){return this.isInRole(ManagerRoleType.Supervisor)}},{key:"isRedactor",value:function(){return this.isAdmin()||this.isSupervisor()}}]),e}();angular.module("app").controller("articlesController",["$scope","$routeParams","$element","articlesService","materialsService",function(e,t,i,n,r){e.authService.isAuthenticated()||e.navigationService.navigateToLogin(),this.articles=[],this.article=new Article,this.materialToDelete=null,this.materialToUpdate=null,this.hideLoading=function(){i.find(".loading").hide()},this.reload=function(e){void 0!=e&&null!=e||(e=t.id),e>0?n.getByID(e).success(function(e){this.article=new Article(e,r),this.hideLoading(),this.reloadMediaGallery(this.article.Materials)}.bind(this)):this.article=new Article},this.reloadAll=function(){n.getAll().success(function(e){for(var t=0;t<e.length;t++)this.articles.push(new Article(e[t],r));this.hideLoading()}.bind(this))},this.reloadAllByPerson=function(e){n.getAllByPerson(e).success(function(e){for(var t=0;t<e.length;t++)this.articles.push(new Article(e[t],r));this.hideLoading()}.bind(this))},this.reloadMediaGallery=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push({id:r.Url,type:r.Type,url:r.ContentUrl,thumbnail:r.ThumbnailUrl,filename:r.FileName,title:r.Title,date:r.Date,comment:r.Comment})}i.find(".sxmg").sxMediaGallery({items:t})},this.createArticle=function(){e.navigationService.modalClose("#create-article-dialog"),n.createArticle(this.article.Title).success(function(t){e.navigationService.navigateToArticleModify(t.ID)}.bind(this))},this.updateArticle=function(){this.article&&n.updateArticle(this.article).success(function(t){e.navigationService.navigateToArticleShow(this.article.ID)}.bind(this))},this.fileUploaded=function(e){this.article&&r.createMaterial(this.article.ID,e.Code).success(function(e){this.article.addMaterial(e,r)}.bind(this))},this.showDeleteMaterialDialog=function(e){this.materialToDelete=e,$("#delete-material-dialog").modal("show")},this.showUpdateMaterialDialog=function(e){this.materialToUpdate=e,$("#update-material-dialog").modal("show")},this.deleteMaterial=function(){this.materialToDelete&&r.deleteMaterial(this.materialToDelete.ID).success(function(){this.article.removeMaterial(this.materialToDelete)}.bind(this))["finally"](function(){this.materialToDelete=null}.bind(this))},this.updateMaterial=function(){this.materialToUpdate&&(r.updateMaterial(this.materialToUpdate),this.materialToUpdate=null)}}]),angular.module("app").controller("authController",["$scope","$rootScope","personsService",function(e,t,i){this.token=null,this.login="",this.password="",this.enter=function(){e.authService.login(this.login,this.password,function(){t.$broadcast("FamilyAuthentication"),e.navigationService.navigateToRoot()}.bind(this))},this.exit=function(){this.token=null,e.authService.logout(),t.navigationService.navigateToRoot()},this.reload=function(){this.token=e.authService.getToken()},this.registrationInit=function(){this.registration={}},this.registrationComplete=function(){e.authService.registration(this.registration).success(function(){$.snackbar({content:"Спасибо, Вы отправили запрос на регистрацию!<br>После рассмотрения, мы отправим Вам письмо (email) с дальнейшей информацией!",timeout:1e4,htmlAllowed:!0}),e.navigationService.navigateToRoot()}.bind(this))},this.showInviteGuestDialog=function(){this.guest=new Guest,$("#invite-guest-dialog").modal("show")},this.inviteGuest=function(){this.guest.Password!=this.guest.PasswordConfirm?$.snackbar({content:"Указанные пароли не совпадают!",style:"error",timeout:5e3,htmlAllowed:!0}):i.inviteGuest(this.guest).success(function(){var e="Успешно приглашен новый гость с логином <strong>"+this.guest.Login+"</strong>.<br> ",t="Ему на почту <strong>"+this.guest.Email+"</strong> было отправлено письмо с доступом к сайту!",i=e+(this.guest.Email?t:"");$.snackbar({content:i,timeout:1e4,htmlAllowed:!0}),this.guest=null,$("#invite-guest-dialog").modal("hide")}.bind(this))},e.$on("FamilyAuthentication",this.reload.bind(this))}]),angular.module("app").controller("personsController",["$scope","$element","$routeParams","personsService","articlesService",function(e,t,i,n,r){this.persons=[],this.person=new Person,this.articles=[];var a=function(e){this.person=new Person(e)}.bind(this),s=function(e){for(var t=0;t<e.length;t++)this.persons.push(new Person(e[t]))}.bind(this),o=function(e){for(var t=0;t<e.length;t++)this.articles.push(new Article(e[t]))}.bind(this);this.hideLoading=function(){t.find(".loading").hide()},this.reload=function(e){void 0!=e&&null!=e||(e=i.id),e>0?n.get(e).success(a):this.person=new Person},this.reloadAll=function(){n.getAll().success(function(e){s(e),this.hideLoading()}.bind(this))},this.reloadWithArticles=function(e){void 0!=e&&null!=e||(e=i.id),this.reload(e),r.getAllByPerson(e).success(function(e){o(e),this.hideLoading()}.bind(this))},this.createPerson=function(){e.navigationService.modalClose("#create-person-dialog"),this.person&&n.createPerson(this.person).success(function(t){e.navigationService.navigateToPersonModify(t.ID)}.bind(this))},this.updatePerson=function(){this.person&&n.updatePerson(this.person).success(function(){e.navigationService.navigateToPersonShow(this.person.ID)}.bind(this))},this.showCreateManagerDialog=function(){this.person&&e.authService.isAdmin()&&(this.manager=new Manager(this.person?this.person.Email||"":""),this.manager.addRole(ManagerRoleType.User),$("#create-manager-dialog").modal("show"),void 0!=this.person.Email&&null!=this.person.Email&&""!=this.person.Email||$.snackbar({content:"<strong>Обратите внимение</strong>, что не указан E-mail,<br> на который нужно отправлять письмо с доступом!!!",timeout:7e3,htmlAllowed:!0}))},this.createManager=function(){e.authService.isAdmin()&&n.createManager(this.person.ID,this.manager.login,this.manager.password,this.manager.getRolesString()).success(function(){$.snackbar({content:"Создан новый пользователь с логином <strong>"+this.manager.login+"</strong>.<br> Ему на почту <strong>"+this.person.Email+"</strong> было отправлено письмо с доступом к сайту!",timeout:1e4,htmlAllowed:!0}),$("#create-manager-dialog").modal("hide")}.bind(this))}}]),angular.module("app").directive("articleCard",[function(){return{restrict:"AE",scope:{article:"=article",classes:"@classes"},templateUrl:"app/partials/article-card.partial.html",controllerAs:"vm",controller:["$scope","$rootScope",function(e,t){e.authService=t.authService,e.navigationService=t.navigationService,this.smallComment=function(){return e.article&&e.article.Comment?e.article.Comment.length>60?e.article.Comment.substr(0,60)+"...":e.article.Comment:""}}]}}]),angular.module("app").directive("articleList",[function(){return{restrict:"AE",scope:{articles:"=articles",filter:"@filter"},templateUrl:"app/partials/article-list.partial.html",controllerAs:"vm",controller:["$scope","$rootScope",function(e,t){this.filter="",this.isFilterVisible=!0,e.filter===!1||"false"==e.filter||"none"==e.filter?this.isFilterVisible=!1:this.filter=e.filter,e.authService=t.authService,e.navigationService=t.navigationService}]}}]),angular.module("app").directive("articleMaterial",[function(){return{restrict:"AE",scope:{article:"=article",material:"=material",editMaterial:"&editMaterial",removeMaterial:"&removeMaterial"},require:["ngModel"],templateUrl:"app/partials/article-material.partial.html",controllerAs:"vm",controller:["$scope","$element","fileService","articlesService","materialsService",function(e,t,i,n,r){this.getUniqueThumbnailUrl=function(){return e.material.ThumbnailUrl+"&guid="+i.makeGuid()},e.thumbnailUrl=this.getUniqueThumbnailUrl(),this.editMaterial=function(){e.editMaterial&&e.editMaterial({material:e.material})},this.removeMaterial=function(){e.removeMaterial&&e.removeMaterial({material:e.material})},this.rotateMaterial=function(t){return r.rotateMaterial(e.material.ID,t).success(function(){e.thumbnailUrl=this.getUniqueThumbnailUrl()}.bind(this))}}]}}]),angular.module("app").directive("avatar",["fileService",function(e){return{restrict:"AE",scope:{avatar:"=avatar",size:"@size",alternate:"@alternate",classes:"@classes",personID:"@personId"},templateUrl:"app/partials/avatar.partial.html",controllerAs:"vm",controller:["$scope","$rootScope",function(t,i){t.navigationService=i.navigationService,t.fileService=e,this.onClick=function(e){t.personID>=0&&(e.stopPropagation(),t.navigationService.navigateToPersonShow(t.personID))}}],link:function(e,t,i){var n=t.find("img"),r=i.size;(!r||r<=0)&&(r=100),n.css({width:r,height:r}),n.attr("title",i.alternate),n.tooltip()}}}]),angular.module("app").directive("avatarEditor",["fileService",function(e){return{restrict:"AE",scope:{avatar:"=avatarEditor"},templateUrl:"app/partials/avatar-editor.partial.html",controllerAs:"vm",controller:["$scope",function(t){t.fileService=e,t.avatarFile=null,t.avatarPreview=null,angular.element(document.querySelector("#avatarFile")).on("change",function(e){var i=e.currentTarget.files[0],n=new FileReader;n.onload=function(e){t.$apply(function(t){t.avatarFile=e.target.result})},n.readAsDataURL(i)}),this.displayAvatarModal=function(e){angular.element(document.querySelector("#avatar-modal")).modal(e?"show":"hide")},this.cancel=function(){this.displayAvatarModal(!1)},this.apply=function(){t.avatar=t.avatarPreview,this.displayAvatarModal(!1)}}]}}]),angular.module("app").directive("fileUpload",["URLS",function(e){return{restrict:"AE",scope:{fileCode:"=fileCode",multipleFiles:"@multipleFiles",fileUploaded:"&fileUploaded"},require:["ngModel"],templateUrl:"app/partials/file-upload.partial.html",controllerAs:"vm",controller:["$scope","authService","fileService","URLS",function(e,t,i,n){this.blob=null,this.isUploading=!1,this.uploadingFileName="",this.flow=new Flow({target:n.API.BASE+n.API.FILEUPLOAD,headers:{Authorization:"Token "+t.getTokenKey()},query:{flowUploadID:i.makeGuid()},singleFile:!e.multipleFiles,testChunks:!1,permanentErrors:[404,500,501],maxChunkRetries:1,chunkRetryInterval:5e3,simultaneousUploads:1}),this.flow.on("uploadStart",function(){this.isUploading=!0}.bind(this)),this.flow.on("complete",function(){this.isUploading=!1,this.flow.files=[]}.bind(this)),this.flow.on("fileProgress",function(e,t){this.uploadingFileName=e.name}.bind(this)),this.flow.on("fileSuccess",function(t,i,n){var r=JSON.parse(i);e.fileUploaded&&e.fileUploaded({file:r}),e.multipleFiles||this.reload(r)}.bind(this)),this.upload=function(){this.flow.upload()},this.reload=function(t){void 0!=t?this.blob=t:e.fileCode?i.getBlob(e.fileCode).success(function(e){this.blob=e}.bind(this)):this.blob=null},this.download=function(){e.fileCode&&i.download(e.fileCode)},e.multipleFiles||this.reload()}]}}]),angular.module("app").directive("memberList",[function(){return{restrict:"AE",scope:{members:"=members"},templateUrl:"app/partials/member-list.partial.html",controllerAs:"vm",controller:["$scope","$rootScope","personsService",function(e,t,i){this.filter="",this.persons=[],i.getAll().success(function(e){for(var t=0;t<e.length;t++)this.persons.push(new Person(e[t]));$("#add-member-button").show()}.bind(this)),this.indexOfMember=function(t){if(!t)return-1;for(var i="number"==typeof t,n=t instanceof Person,r=0;r<e.members.length;r++){if(i&&e.members[r].ID==t)return r;if(n&&(e.members[r]==t||e.members[r].ID==t.ID))return r}return-1},this.existMember=function(e){return this.indexOfMember(e)>=0},this.addMember=function(t){t&&!this.existMember(t.ID)&&e.members.push(new Member(t))},this.removeMember=function(t){for(var i=this.indexOfMember(t);i>=0;)e.members.splice(i,1),i=this.indexOfMember(t)}}]}}]),angular.module("app").directive("personCard",[function(){return{restrict:"AE",scope:{person:"=person",classes:"@classes"},templateUrl:"app/partials/person-card.partial.html",controllerAs:"vm",controller:["$scope","$rootScope",function(e,t){e.authService=t.authService,e.navigationService=t.navigationService}]}}]),angular.module("app").directive("personList",[function(){return{restrict:"AE",scope:{persons:"=persons"},templateUrl:"app/partials/person-list.partial.html",controllerAs:"vm",controller:["$scope",function(e){this.filter=""}]}}]),angular.module("app").filter("articleSearch",function(){return function(e,t){var i=[];if(e&&e.length)for(var n=0;n<e.length;n++){var r=new Article(e[n]);r.match(t)&&i.push(e[n])}return i}}),angular.module("app").filter("personSearch",function(){return function(e,t){var i=[];if(e&&e.length)for(var n=0;n<e.length;n++){var r=new Person(e[n]);r.match(t)&&i.push(e[n])}return i}}),angular.module("app").factory("articlesService",["$http","authService","URLS",function(e,t,i){return{getAll:function(){return e.get(i.API.BASE+"article")},getAllByPerson:function(t){return e.get(i.API.BASE+"person/"+t+"/articles")},getByID:function(t){return e.get(i.API.BASE+"article/"+t)},createArticle:function(t){var n={Title:t};return e.post(i.API.BASE+"article",n)},updateArticle:function(t){var n=[];if(t.Members&&t.Members.length>0)for(var r=0;r<t.Members.length;r++)n.push(t.Members[r].ID);var a={Title:t.Title,PeriodBegin:t.PeriodBegin,PeriodEnd:t.PeriodEnd,Comment:t.Comment,Persons:n};return e.post(i.API.BASE+"article/"+t.ID,a)}}}]),angular.module("app").factory("authService",["$http","URLS","localStorageService",function(e,t,i){return{setToken:function(e){i.set("token",e)},getToken:function(){return new Token(i.get("token"))},getTokenKey:function(){var e=this.getToken();return e&&e.Key?e.Key:null},removeToken:function(){i.remove("token")},registration:function(i){return e.post(t.API.BASE+"user/registration",i)},login:function(i,n,r,a){var s={Login:i,Password:n};return e.post(t.API.BASE+"auth",s).success(function(e){this.setToken(e),this.redefineHeaders(),r&&r(e)}.bind(this)).error(function(e,t){this.removeToken(),this.redefineHeaders(null),a&&a(e,t)}.bind(this))},logout:function(){this.removeToken(),this.redefineHeaders(null)},isAuthenticated:function(){var e=this.getToken();return e&&e.isAuthenticated()},isInRole:function(e){var t=this.getToken();return t&&t.isInRole(e)},isRedactor:function(){var e=this.getToken();return e&&e.isRedactor()},isAdmin:function(){var e=this.getToken();return e&&e.isAdmin()},getSASToken:function(){var e=this.getToken();return e.getValue("sas")||""},redefineHeaders:function(t){if(void 0==t){var i=this.getTokenKey();t=i?"Token "+i:null}e.defaults.headers.common.Authorization=t}}}]),angular.module("app").factory("fileService",["$http","URLS","authService",function(e,t,i){return{makeGuid:function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},getAvatarSrc:function(e){return void 0==e||null==e||""==e?"./images/avatar.jpg":e.startsWith("data:")?e:t.API.BASE+"avatar/"+e},getBlob:function(i){return e.get(t.API.BASE+"file/"+i)},download:function(e){var n=i.getTokenKey(),r=t.API.BASE+"file/"+e+"/content?Token="+n;$window.open(r)}}}]),angular.module("app").factory("materialsService",["$http","authService","URLS",function(e,t,i){return{createMaterial:function(t,n){var r={ArticleID:t,FileCode:n};return e.post(i.API.BASE+"/material",r)},updateMaterial:function(t){var n={Date:t.Date,Title:t.Title,Comment:t.Comment};return e.post(i.API.BASE+"/material/"+t.ID,n)},deleteMaterial:function(t){return e["delete"](i.API.BASE+"/material/"+t)},downloadMaterial:function(e){var t=this.getMaterialContentUrl(e);$window.open(t)},transformMaterial:function(t,n,r){var a={Method:n,Argument:r};return e.post(i.API.BASE+"/material/"+t+"/transform",a)},rotateMaterial:function(e,t){return this.transformMaterial(e,"rotate",t?"true":"false")},getMaterialUrl:function(e,n){var r=void 0==n||null==n?"":n;return i.STORAGEURL+e+t.getSASToken()+r},getMaterialContentUrl:function(e,t){return void 0==e||null==e?null:"string"==typeof e?this.getMaterialUrl(e,t):e instanceof Material?this.getMaterialUrl(e.Url,t):null},getMaterialThumbnailUrl:function(e,t){if(void 0==e||null==e)return null;var i=".thumbnail.jpg";return"string"==typeof e?this.getMaterialUrl(e+i,t):e instanceof Material?this.getMaterialUrl(e.Url+i,t):null}}}]),angular.module("app").factory("navigationService",["URLS","$location","authService",function(e,t,i){return{modalClose:function(e){e&&$(e).modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()},navigateToRoot:function(){t.path("/")},navigateToLogin:function(){t.path("login")},navigateToRegistration:function(){t.path("registration")},navigateToPersonList:function(){t.path("persons/")},navigateToPersonShow:function(e){i.isAuthenticated()?t.path("persons/"+e):this.navigateToLogin()},navigateToPersonModify:function(e){i.isAuthenticated()?i.isRedactor()?t.path("edit/person/"+e):this.navigateToRoot():this.navigateToLogin()},navigateToArticleList:function(){i.isAuthenticated()?t.path("articles/"):this.navigateToLogin()},navigateToArticleShow:function(e){i.isAuthenticated()?t.path("articles/"+e):this.navigateToLogin()},navigateToArticleModify:function(e){i.isAuthenticated()?i.isRedactor()?t.path("edit/article/"+e):this.navigateToRoot():this.navigateToLogin()}}}]),angular.module("app").factory("personsService",["$http","URLS","authService",function(e,t,i){return{getAll:function(){return e.get(t.API.BASE+"person")},get:function(i){return e.get(t.API.BASE+"person/"+i)},createPerson:function(i){var n={Name:i.Name};return e.post(t.API.BASE+"person",n)},updatePerson:function(i){var n={Name:i.Name,Gender:i.Gender,Avatar:i.Avatar,Email:i.Email,Phone:i.Phone,DateBirth:i.DateBirth,DateDeath:i.DateDeath};return e.post(t.API.BASE+"person/"+i.ID,n)},createManager:function(n,r,a,s){if(!i.isAdmin())throw new Error("Только администраторы могут создавать пользователей!");var o={Login:r,Password:a||"",Roles:s||"User"};return e.post(t.API.BASE+"person/"+n+"/manager",o)},inviteGuest:function(i){return e.post(t.API.BASE+"person/invite",i)}}}]);