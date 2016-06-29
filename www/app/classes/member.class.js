'use strict';

class Member {

    constructor(obj) {
        if (obj) {
            this.ID = obj.ID;
            this.Avatar = obj.Avatar;

            if (obj instanceof Person)
                this.Name = obj.nameTotal;
            else
                this.Name = obj.Name;
        }
        else {
            this.ID = 0;
            this.Avatar = null;
            this.Name = '';
        }
    }

    match(filter) {
        if (!filter || filter == '')
            return true;

        let regex = new RegExp(filter, "i");
        return this.Name.search(regex) >= 0;
    }
}