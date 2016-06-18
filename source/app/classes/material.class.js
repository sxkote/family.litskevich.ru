'use strict';

class Material {
    constructor(obj) {
        if (obj) {
            this.ID = obj.ID;
            this.ArticleID = obj.ArticleID;
            this.Code = obj.Code;

            this.Date = (obj.Date) ? new Date(obj.Date) : null;
            this.Title = obj.Title;
            this.Comment = obj.Comment ? obj.Comment : '';
        }
        else {
            this.ID = 0;
            this.ArticleID = 0;
            this.Code = null;

            this.Date = null;
            this.Title = '';
            this.Comment = '';

        }
    }
}