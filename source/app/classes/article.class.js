'use strict';

class Article {
    constructor(obj) {
        this.Materials = [];
        this.Persons = [];

        if (obj) {
            this.ID = obj.ID;

            this.Author = new Person(obj.Author);
            this.Date = new Date(obj.Date);

            this.Title = obj.Title;
            this.Period = {
                'Begin': obj.Period && obj.Period.Begin ? new Date(obj.Period.Begin) : null,
                'End': obj.Period && obj.Period.End ? new Date(obj.Period.End) : null
            };
            this.Comment = obj.Comment ? obj.Comment : '';

            if (obj.Materials && obj.Materials.length)
                for (let i = 0; i < obj.Materials.length; i++)
                    this.addMaterial(obj.Materials[i]);

            if (obj.Persons && obj.Persons.length)
                for (let i = 0; i < obj.Persons.length; i++)
                    this.addPerson(obj.Persons[i]);
        }
        else {
            this.ID = 0;

            this.Author = null;
            this.Date = Date.now();

            this.Title = '';
            this.Period = {'Begin': null, 'End': null};
            this.Comment = '';
        }
    }

    get searchText() {
        return this.Title + ' ' + this.Comment;
    }

    getDates() {
        let result = '';

        if (!this.Period)
            return '';

        if (this.Period.Begin != null && this.Period.Begin != undefined)
            result += new moment(this.Period.Begin).format('DD.MM.YYYY');

        if (this.Period.End != null && this.Period.End != undefined)
            result += ' - ' + new moment(this.Period.End).format('DD.MM.YYYY');

        return result;
    }

    addMaterial(material) {
        this.Materials.push(new Material(material));
    }

    removeMaterial(material) {
        if (material == null || material == undefined)
            return;

        let index = this.Materials.indexOf(material);

        if (index >= 0)
            this.Materials.splice(index, 1);
    }

    addPerson(person) {
        this.Persons.push(new Person(person));
    }

    removePerson(person) {
        if (person == null || person == undefined)
            return;

        let index = this.Persons.indexOf(person);

        if (index >= 0)
            this.Persons.splice(index, 1);
    }

}