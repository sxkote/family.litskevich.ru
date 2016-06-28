'use strict';

const ManagerRoleType = {
    User: 'User',
    Supervisor: 'Supervisor',
    Admin: 'Admin'
};

class Manager {

    constructor(obj) {
        this.login = '';
        this.password = '';
        this._roles = [];

        if (obj) {
            if (typeof obj == 'string') {
                this.login = obj;
            }
            else {
                this.login = obj.login;
                this.password = obj.password;
            }
        }

        //this.addRole(ManagerRoleType.User);
    }

    get roles() {
        if (this._roles == null || this._roles == undefined) {
            this._roles = [];
        }
        return this._roles;
    }

    inRole(role) {
        if (role == undefined || role == null || role == '' || typeof role != 'string')
            return false;

        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].toLowerCase() == role.toLowerCase())
                return true;
        }

        return false;
    }

    addRole(role) {
        if (role == undefined || role == null || role == '' || typeof role != 'string')
            return;

        if (!this.inRole(role))
            this.roles.push(role);
    }

    removeRole(role) {
        if (role == undefined || role == null || role == '' || typeof role != 'string')
            return;

        for (let i = this.roles.length - 1; i >= 0; i--)
            if (this.roles[i].toLowerCase() == role.toLowerCase())
                this.roles.splice(i, 1);
    }

    setRole(role, flag) {
        if (role == undefined || role == null || role == '' || typeof role != 'string')
            return;

        if (flag)
            this.addRole(role);
        else
            this.removeRole(role);
    }

    getRolesString() {
        return this.roles.join(',');
    }

    get isUser() {
        return this.inRole(ManagerRoleType.User);
    }

    set isUser(value) {
        this.setRole(ManagerRoleType.User, value);
    }

    get isSupervisor() {
        return this.inRole(ManagerRoleType.Supervisor);
    }

    set isSupervisor(value) {
        this.setRole(ManagerRoleType.Supervisor, value);
    }

    get isAdmin() {
        return this.inRole(ManagerRoleType.Admin);
    }

    set isAdmin(value) {
        this.setRole(ManagerRoleType.Admin, value);
    }
}