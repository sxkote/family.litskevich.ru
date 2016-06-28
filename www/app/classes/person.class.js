'use strict';

class Person {

    constructor(obj) {
        if (obj) {
            this.ID = obj.ID;
            this.Avatar = obj.Avatar;
            this.Name = obj.Name;
            this.Gender = obj.Gender;

            this.Email = obj.Email || '';
            this.Phone = obj.Phone || '';

            this.DateBirth = (obj.DateBirth) ? new Date(obj.DateBirth) : null;
            this.DateDeath = (obj.DateDeath) ? new Date(obj.DateDeath) : null;
        }
        else {
            this.ID = 0;
            this.Avatar = null;
            this.Name = {'First': '', 'Last': '', 'Second': '', 'Maiden': ''};
            this.Gender = 1;
            this.Email = '';
            this.Phone = '';
            this.DateBirth = null;
            this.DateDeath = null;
        }
    }

    get nameFull() {
        return this.Name.Last + ' ' + this.Name.First + ' ' + this.Name.Second;
    }

    get nameTotal() {
        let maiden = (this.Name.Maiden && this.Name.Maiden.length > 0) ? ` (${this.Name.Maiden})` : '';
        return `${this.Name.Last}${maiden} ${this.Name.First} ${this.Name.Second}`;
    }

    getNameFirstLine() {
        let maiden = (this.Name.Maiden && this.Name.Maiden.length > 0) ? ` (${this.Name.Maiden})` : '';
        return `${this.Name.Last}${maiden}`;
    }

    getNameSecondLine(){
        return  `${this.Name.First} ${this.Name.Second}`;
    }

    match(filter) {
        if (!filter || filter == '')
            return true;

        let text = this.Name.First + ' ' + this.Name.Second + ' ' + this.Name.Last + ' ' + this.Name.Maiden;

        let regex = new RegExp(filter, "i");

        return text.search(regex) >= 0;
    }

    getDates() {
        let result = '';

        if (this.DateBirth != null && this.DateBirth != undefined)
            result += this.DateBirth.toRussianString();

        if (this.DateDeath != null && this.DateDeath != undefined)
            result += ' - ' + this.DateDeath.toRussianString();

        return result;
    }
}