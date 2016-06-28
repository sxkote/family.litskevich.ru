'use strict';

class Token {
    constructor(obj) {
        if (obj) {
            this.Key = obj.Key;
            this.Login = obj.Login;
            this.Name = obj.Name;
            this.Avatar = obj.Avatar;
            this.Expire = new Date(obj.Expire);
            this.Roles = obj.Roles;
            this.Values = obj.Values || [];
        }
        else {
            this.Key = null;
            this.Login = null;
            this.Name = {'First': '', 'Last': ''};
            this.Avatar = null;
            this.Expire = null;
            this.Roles = [];
            this.Values = [];
        }
    }

    getValue(name){
        if (this.Values == undefined || this.Values ==null || this.Values.length <= 0)
            return '';

        for (let i = 0; i < this.Values.length; i++)
            if (this.Values[i].Name.toLowerCase() == name.toLowerCase())
                return this.Values[i].Value || '';

        return '';
    }

    isAuthenticated() {
        return this.Key && this.Key.length > 0 && this.Expire && this.Expire > Date.now();
    }

    isInRole(role) {
        if (!this.isAuthenticated())
            return false;

        return this.Roles && this.Roles.length > 0 && this.Roles.indexOf(role) >= 0;
    }

    isAdmin() {
        return this.isInRole(ManagerRoleType.Admin);
    }

    isSupervisor() {
        return this.isInRole(ManagerRoleType.Supervisor);
    }

    isRedactor() {
        return this.isAdmin() || this.isSupervisor();
    }
}