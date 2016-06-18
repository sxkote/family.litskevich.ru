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
        }
        else {
            this.Key = null;
            this.Login = null;
            this.Name = {'First': '', 'Last': ''};
            this.Avatar = null;
            this.Expire = null;
            this.Roles = [];
        }
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
        return this.isInRole('Admin');
    }

    isSupervisor() {
        return this.isInRole('Supervisor');
    }

    isRedactor() {
        return this.isAdmin() || this.isSupervisor();
    }
}