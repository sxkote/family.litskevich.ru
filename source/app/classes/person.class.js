'use strict';

class Person {

    constructor(obj) {
        if (obj) {
            this.ID = obj.ID;
            this.Avatar = obj.Avatar;
            this.Name = obj.Name;
            this.Gender = obj.Gender;

            this.DateBirth = (obj.DateBirth) ? new Date(obj.DateBirth) : null;
            this.DateDeath = (obj.DateDeath) ? new Date(obj.DateDeath) : null;
        }
        else {
            this.ID = 0;
            this.Avatar = null;
            this.Name = {'First': '', 'Last': '', 'Second': '', 'Maiden': ''};
            this.Gender = 1;
            this.DateBirth = null;
            this.DateDeath = null;
        }
    }

    get nameFull() {
        return this.Name.Last + ' ' + this.Name.First + ' ' + this.Name.Second;
    }

    get nameLast() {
        let result = this.Name.Last;
        if (this.Name.Maiden && this.Name.Maiden.length > 0)
            result += ' (' + this.Name.Maiden + ')';
        return result;
    }

    get nameFirst() {
        return this.Name.First + ' ' + this.Name.Second;
    }

    get nameTotal() {
        return this.nameLast + ' ' + this.nameFirst;
    }

    get searchText() {
        return this.Name.First + ' ' + this.Name.Second + ' ' + this.Name.Last + ' ' + this.Name.Maiden;
    }

    getDates() {
        let result = '';

        if (this.DateBirth != null && this.DateBirth != undefined)
            result += new moment(this.DateBirth).format('DD.MM.YYYY');

        if (this.DateDeath != null && this.DateDeath != undefined)
            result += ' - ' + new moment(this.DateDeath).format('DD.MM.YYYY');

        return result;
    }
}