'use strict';

class Author {

    constructor(obj) {
        if (obj) {
            this.ID = obj.ID;
            this.Avatar = obj.Avatar;
            this.Name = obj.Name;
        }
        else {
            this.ID = 0;
            this.Avatar = null;
            this.Name = '';
        }
    }
}