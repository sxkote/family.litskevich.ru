'use strict';

class Article {
    constructor(obj, materialsService) {
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

            if (obj.Materials && obj.Materials.length)
                for (let i = 0; i < obj.Materials.length; i++)
                    this.addMaterial(obj.Materials[i], materialsService);

            if (obj.Members && obj.Members.length)
                for (let i = 0; i < obj.Members.length; i++)
                    this.addMember(obj.Members[i]);
        }
        else {
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

    getDates() {
        let result = '';

        if (this.PeriodBegin != null && this.PeriodBegin != undefined)
            result += this.PeriodBegin.toRussianString();

        if (this.PeriodEnd != null && this.PeriodEnd != undefined)
            result += ' - ' + this.PeriodEnd.toRussianString();

        return result;
    }

    addMaterial(material, materialsService) {
        this.Materials.push(new Material(material, materialsService));
    }

    removeMaterial(material) {
        if (material == null || material == undefined)
            return;

        let index = this.Materials.indexOf(material);

        if (index >= 0)
            this.Materials.splice(index, 1);
    }

    addMember(member) {
        this.Members.push(new Member(member));
    }

    removeMember(member) {
        if (member == null || member == undefined)
            return;

        let index = this.Members.indexOf(member);

        if (index >= 0)
            this.Members.splice(index, 1);
    }

    match(filter) {
        if (!filter || filter == '')
            return true;

        let text = this.Title + ' ' + this.Comment;

        let regex = new RegExp(filter, "i");
        if (text.search(regex) >= 0)
            return true;

        for (let i = 0; i < this.Members.length; i++)
            if (this.Members[i].match(filter))
                return true;

        // search by year
        if (filter.search(/^\d{4}$/i) == 0) {
            let year = parseInt(filter);

            if (this.Date.getFullYear() == year)
                return true;

            if (this.PeriodBegin && this.PeriodBegin.getFullYear() == year)
                return true;

            if (this.PeriodEnd && this.PeriodEnd.getFullYear() == year)
                return true;
        }

        return false;
    }
}