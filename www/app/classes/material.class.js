'use strict';

const MaterialType =
{
    File: 'File',
    Image: 'Image',
    Video: 'Video',
    Audio: 'Audio',
    PDF: 'PDF',
    Excel: 'Excel',
    Word: 'Word',
    PowerPoint: 'PowerPoint',
    Text: 'Text',
    ZIP: 'ZIP'
};

class Material {
    constructor(obj, materialsService) {
        if (obj) {
            this.ID = obj.ID;

            this.Type = obj.Type || '';
            this.Url = obj.Url || '';
            this.FileName = obj.FileName || '';

            this.Date = (obj.Date) ? new Date(obj.Date) : null;
            this.Title = obj.Title;
            this.Comment = obj.Comment ? obj.Comment : '';

            this.ContentUrl = obj.ContentUrl || '';
            this.ThumbnailUrl = obj.ThumbnailUrl || '';
        }
        else {
            this.ID = 0;
            this.ArticleID = 0;

            this.Type = '';
            this.Url = '';
            this.FileName = '';

            this.Date = null;
            this.Title = '';
            this.Comment = '';

            this.ContentUrl = '';
            this.ThumbnailUrl = '';
        }

        if (materialsService && this.Url) {
            this.ContentUrl = materialsService.getMaterialContentUrl(this.Url);
            this.ThumbnailUrl = materialsService.getMaterialThumbnailUrl(this.Url);
        }
    }

    /**
     * @return {number}
     */
    static Compare(a, b) {

        // if no Dates than compare by ID
        if (!a.Date && !b.Date)
            return a.ID - b.ID;

        // date B is not set, than B later than A
        if (!b.Date)
            return -1;

        // date A is not set, than A later than B
        if (!a.Date)
            return 1;

        if (a.Date < b.Date)
            return -1;

        if (a.Date > b.Date)
            return 1;

        return 0;
    }
}