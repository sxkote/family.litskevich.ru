;(function ($, window, document, undefined) {
    'use strict';

    // Create the defaults once
    var pluginName = 'sxMediaGallery';
    var pluginPrefix = 'sxmg';

    const FileType = {
        File: 'file',
        Image: 'image',
        Video: 'video',
        Audio: 'audio',
        PDF: 'pdf',
        Excel: 'excel',
        Word: 'word',
        PowerPoint: 'powerpoint',
        Text: 'text',
        ZIP: 'zip'
    };

    const IconCollection = {
        Close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABYElEQVRYR7WX7RHCIAyG46Y6gTqJOoGu6AR6L3fhUkrIB5Rfnm3zPAUS0hPtx5mI3kT0JKJ753rmrwcRIS7ifWSAUxON4fw3br5kiOIZvAzi8kC8KiEFWvgKiRa+k2ABDT4jocE3EhCw4BkJC14lIPALrLFnT3jhBRuZAc9MhODY4N490E5SbybCcGSDJwu0FZISKTgvgQR4N6RcDvyWeW5tKbUO8INRCQsor2/gvRk4UmIHHwnwtGJtV4wu3BJYJaHCPQKzEkO4VyArgaMXR/pwtMexdnM0zxHHU7ZLKbZGBi7rxLCfsARm4C6JkcAKuCmhCayEDyV6AkfAVYlWIArnDRapmJvskAIZOHe30QOsSrDADDx7gBUJCKBaXa1iIK6Pymt0Jl7RptSs7YEuG+/0jTSlHnh0OdxNaQTulSgxPU1pBm5J1JjWx+kMXJNwNaXIjFv7KR3IlPZWZEc35h/4CGLAjclibQAAAABJRU5ErkJggg==',
        Menu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAARUlEQVRYR+3U0QkAIAgFQN1/6IL6aQIVOhd4cujLaJ5szg8LEHgFVvFBnmwLEBglUPwEN25UEekBAgT0gBsgQEAP/CmwAdmEEiEL49BKAAAAAElFTkSuQmCC',
        Download: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABqklEQVRYR+2X7U3DMBCG327ACDABMAEwATABMAGMABNAJ4BOQDcAJqBswAbQCUBPdFeFJK4/4qp/OKlKFdn3Pr4725eJtmyTLevrH6BWBC4knUk6lrQj6VvSq6SpPYOZTgXA+amkXUmfku7seSDpURLPkAFyblC9MSkACFx2ZrLCW/ux4pgtJJ0MQcQAEAaghs0tEn98xQAI31ENdfNxKIlorCwG8GVFVYuBorwJAZDLa8s3xbYJe7Od0osAVfxsVb4JYfdJ8T7Y9uR/cxKy8pfIVqoNhTi7YgEAObmvrZDgD4g9AN4LV98t4J8E0e6QKU5KJnr62g5L/DQpKJlYC6ApQg6G/YLw1UjBEielx20NgJk7KYnCWIAlxe9OOAs499el4knSVWKqYlFFnDHz7ip4ybkQAkmBWCeOMLciVzl9RXJPiDBdD7YOoi0+G+gjegGM3YbtCTGIbPGcCDhICKJIvATAU9BOB1esd01JYQ/1A4kFvqoDh/B52eKlEWBed9t+WKPR3PE5llOEXb8OwXu+B7LFx0TAYbwlLxKvAZAT7cGxY1IwWhwHv/0QUz8k+/1lAAAAAElFTkSuQmCC',
        Profile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABIklEQVRYR+2XYQ3CMBSEbwrAAeAAJyABB+AAcAAOkIAUJIADHEBudMvWjLzjNR1Zsv4hjJf3vh3XS1vgs04AVgDm4XuujzuAC4BjNaAIw7e5Jn7pS4ADfyPAE8CkZwAqsagAXj0Pb6pfKhAD8FmO1TlnUABTAHsA6yBPy82CZMkKcKvGu+UMYCcMZ0kyQNduqd0sQGQBePwQXskADA56oLnqQOlDgSqymyYs00xcbgWWkfvjedeQ7TcDxA1Ao82M5ooZ3QBqVFsJOlwA0WNmmVsBs7NY4AZQPRBzxJ4YLoCosFnmVsDsLBa4AUYPiAqbZe6/wOwsFowAsgKiosllZVL+62pWnyUJ0HXWS349o0HrcspaQmyEk08qGN+cF5r6LPkGr15XIUxe5/QAAAAASUVORK5CYII=',
        ArrowLeft: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAu0lEQVRYR82XYQ6AIAhG8abdrI7abHMzBoIyP+x38B4sCQslPyXIv4joieSICFT4TUSRHMvBDV6Lhwv0cLgAh0MFJDhMQINDBEbw7QIWfKuABx6ZQV+sdoYhcE0ABpcEoHAuAIf3AinwowSqTEoX+DGES0hzACpx5CBq4xXSCWud8khYOYb/C0+wJeHJoUp4g1MXEuub8BYhdmE2OHUp1ToxW8SvE6vBqRcT3onVIoYrmXfXS72ceiWH772wrR4VW0r/CgAAAABJRU5ErkJggg==',
        ArrowRight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAq0lEQVRYR8XXAQqAIAyF4XnTulmdtFiQIGZuc2/zAP4fgg4LJa/i0D+IaLPu4wG4iIgRuwXhBeC2CeEJMCG8AWoEAqBCoABiBBIgQqABUwQD+B6j1/CKRgGGJxEJ+EREAzpEBqBBZAEqIhNw8hjPAjxxPoYMQI1nAJp4NKCLRwI+4y9gdQ7MZskwHgH4jaMB0zgSIIqjAOI4AqCKewPUcU+AKe4FSP+cLj1kN48NOiE+oolLAAAAAElFTkSuQmCC'
    };

    var extendDefaults = function (source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    };

    class SXMediaMaterial {
        constructor(obj) {
            this.url = '';
            this.type = '';
            this.title = '';
            this.comment = '';
            this.date = null;
            this.avatar = '';

            if (obj && typeof obj == 'object')
                extendDefaults(this, obj);

            if (this.date)
                this.date = new Date(this.date);

            if (this.type == null || this.type == undefined || this.type == '')
                this.type = SXMediaMaterial.defineFileType(this.url);

            if (this.type == FileType.Image && (!this.avatar || this.avatar == ''))
                this.avatar = this.url;
        }

        get hasInfoToDisplay() {
            return this.dateString || this.title || this.comment;
        }

        get dateString() {
            if (this.date == null || this.date == undefined || !(this.date instanceof Date))
                return '';

            return `${this.date.getFullYear()}.${this.date.getMonth() + 1}.${this.date.getDate()}`;
        }

        toString() {
            return this.url;
        }

        static defineFileType(filename) {
            if (!filename || typeof filename != 'string' || filename == '')
                return FileType.File;

            let extenstion = filename.substring(filename.lastIndexOf('.') + 1);
            switch (extenstion) {
                case "jpeg":
                case "jpg":
                case "bmp":
                case "png":
                case "gif":
                case "tiff":
                    return FileType.Image;

                case "avi":
                case "mpeg":
                case "mp4":
                case "wmv":
                case "mov":
                    return FileType.Video;

                case "mp3":
                case "wav":
                case "wma":
                    return FileType.Audio;

                case "pdf":
                    return FileType.PDF;

                case "doc":
                case "docx":
                case "dotx":
                    return FileType.Word;

                case "xls":
                case "xlsx":
                    return FileType.Excel;

                case "ppt":
                case "pptx":
                    return FileType.PowerPoint;

                case "txt":
                    return FileType.Text;

                case "zip":
                case "7z":
                case "rar":
                    return FileType.ZIP;

                default:
                    return FileType.File;
            }
        }
    }

    class SXMediaGalleryViewer {
        constructor(options) {
            this._prefix = pluginPrefix + "-view";
            this._defaults = {width: 1, height: 1, infoVisible: true};
            this._options = extendDefaults(this._defaults, options);

            this._element = $(`<div class='${this._prefix}'></div>`);
        }

        get infoVisible() {
            return this._options.infoVisible
        }

        get element() {
            return this._element == undefined ? null : this._element;
        }

        get material() {
            return this._material == undefined ? null : this._material;
        }

        set material(obj) {
            this.clear();

            if (obj == null || obj == undefined)
                this._material = null;
            else if (obj instanceof SXMediaMaterial)
                this._material = obj;
            else if (typeof obj == 'object')
                this._material = new SXMediaMaterial(obj);
            else
                throw new Error("Invalid Material object specified!");
        }

        // display GalleryViewer content
        displayMaterial(material) {
            let prefix = this._prefix;

            if (this.element == null)
                throw new Error('GalleryView DOM element is destroyed!');

            if (material != undefined)
                this.material = material;

            this.clear();

            if (this.material == null)
                return;

            //define different material types content
            if (this.material.type == FileType.Image) {
                this._content = $(`<img src=${this.material.url} class='${prefix}-content ${prefix}-content-image'>`);
                this._content.css('visibility', 'hidden');

                this._content.load(function (event) {
                    this._contentOriginalWidth = event.target.width;
                    this._contentOriginalHeight = event.target.height;
                    this.resize(this._options.width, this._options.height);
                    this._content.css('visibility', 'visible');
                }.bind(this));
            }
            else if (this.material.type == FileType.Video) {
                this._content = $(`<video class='${prefix}-content ${prefix}-content-video' controls="controls"><source src="${this.material.url}"></video>`);
                this._contentOriginalWidth = 640;
                this._contentOriginalHeight = 480;
                this.resize(this._options.width, this._options.height);
            }
            else
                this._content = $(`<div class='${prefix}-content'><h2>No data to display</h2></div>`);

            if (this._content) {
                this.element.append(this._content);
            }

            this.displayInfo(this.infoVisible);
        }

        displayInfo(visible) {
            let prefix = this._prefix;

            if (this.element == null)
                throw new Error('GalleryView DOM element is destroyed!');

            this._options.infoVisible = visible == undefined || visible ? true : false;

            if (this.infoVisible) {
                let info = $(`<div class='${prefix}-info'></div>`);
                info.append($(`<h1 class='${prefix}-info-header'><span class='${prefix}-info-date'>${this.material.dateString}</span> <span class='${prefix}-info-title'>${this.material.title || ''}</span></h1>`));
                info.append($(`<div class='${prefix}-info-comment'>${this.material.comment || ''}</div>`));

                this.element.append(info);
            }
            else {
                this.element.find(`.${prefix}-info`).remove();
            }
        }

        toggleInfo() {
            this.displayInfo(!this.infoVisible);
        }

        // clear GalleryViewer content
        clear() {
            this._content = null;
            this._contentOriginalWidth = 0;
            this._contentOriginalHeight = 0;

            if (this.element != null)
                this.element.empty();
        }

        // remove GalleryViewer from DOM
        remove() {
            if (this.element != null) {
                this.element.remove();
                this._element = null;
            }
        }

        // resize Image by current view sizes
        resize(width, height) {
            this._options.width = width;
            this._options.height = height;

            if (this.element == null || this.material == null)
                return;

            if (this._content == null || this._contentOriginalWidth <= 0 || this._contentOriginalHeight <= 0)
                return;

            // we'd like to have no interception with info block
            if (this.material.type == FileType.Video) {
                height -= 2 * (this.element.find(`.${this._prefix}-info`).height() || 0);
            }

            let coefficient = Math.min(width / this._contentOriginalWidth, height / this._contentOriginalHeight);

            this._content.css({
                width: this._contentOriginalWidth * coefficient,
                height: this._contentOriginalHeight * coefficient
            });
        }

        // download current Material
        download() {
            if (this.material == null || this.element == null)
                return;

            var elementDOM = this.element[0];
            var url = this.material.url;
            var filename = this.material.filename || url.substring(url.lastIndexOf("/") + 1).split("?")[0];

            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                let a = document.createElement('a');
                a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
                a.download = filename; // Set the file name.
                a.style.display = 'none';
                elementDOM.appendChild(a);
                a.click();
                elementDOM.removeChild(a);
            };
            xhr.open('GET', url, true);
            xhr.send();
        }

        // create GalleryViewer by Material and Options
        static create(options, material) {
            let result = new SXMediaGalleryViewer(options);

            if (material != undefined)
                result.display(material);

            return result;
        }
    }

    class SXMediaGalleryButton {
        constructor(options) {
            this._defaults = {type: 'button', name: 'name', src: '', handler: null};
            this._options = extendDefaults(this._defaults, options);
            this._prefix = pluginPrefix + "-" + this._options.type;

            this._element = $(`<a class='${this._prefix} ${this._prefix}-${this.name} unselectable'><img ${this._options.src ? `src='${this._options.src}'` : ''}></a>`);

            if (this.handler != null)
                this.element.click(handler);
        }

        get element() {
            return this._element == undefined ? null : this._element;
        }

        get name() {
            return this._options.name;
        }

        get handler() {
            return this._options.handler == undefined ? null : this._options.handler;
        }

        static create(type, name, src, handler) {
            return new SXMediaGalleryButton({type: type, name: name, src: src, handler: handler});
        }
    }

    class SXMediaGalleryMenu {
        constructor(options) {
            this._defaults = {};
            this._options = extendDefaults(this._defaults, options);
            this._prefix = pluginPrefix + "-menu";

            this._element = $(`<div class='${this._prefix}'></div>`);

            this._buttons = [];

            //if (this._options.buttons && this._options.buttons instanceof Array)
            //    for (let i = 0; i < this.buttons.length; i++) {
            //        this.addButton(SXMediaGalleryButton.create(this.buttons[i].name, this.buttons[i].src, this.buttons[i].handler));
            //    }
        }

        get element() {
            return this._element == undefined ? null : this._element;
        }

        get buttons() {
            if (this._buttons == undefined || this._buttons == null || !(this._buttons instanceof Array))
                this._buttons = [];
            return this._buttons;
        }

        addButton(button) {
            if (button == undefined || button == null || !(button instanceof SXMediaGalleryButton))
                throw new Error('Wrong Button specified!');

            this.buttons.push(button);

            this.element.append(button.element);
        }

        getButton(name) {
            for (let i = 0; i < this.buttons.length; i++)
                if (this.buttons[i].name.toLowerCase() == name.toLowerCase())
                    return this.buttons[i];
            return null;
        }
    }

    class SXMediaGalleryDesk {
        constructor(options) {
            this._defaults = {};
            this._options = extendDefaults(this._defaults, options);
            this._prefix = pluginPrefix + "-desk";

            this._element = $(`<div class='${this._prefix}'></div>`).css('display', 'none');

            this._isVisible = false;
            this._materials = [];
        }

        get element() {
            return this._element == undefined ? null : this._element;
        }

        get isVisible() {
            return this._isVisible == undefined || this._isVisible == null ? false : this._isVisible;
        }

        get materials() {
            if (!this._materials || !(this._materials instanceof Array))
                this._materials = [];
            return this._materials;
        }

        display(visible) {
            if (visible == undefined || visible) {
                this._isVisible = true;
                this.element.show();
            }
            else {
                this._isVisible = false;
                this.element.hide();
            }
        }

        toggle() {
            this.display(!this.isVisible);
        }

        addMaterial(material, handle) {
            if (!material || !(material instanceof SXMediaMaterial))
                return;

            this.materials.push(material);

            let item = $(`<div class='${this._prefix}-item'><img class='${this._prefix}-item-avatar' src='${material.avatar}'></div>`);

            if (handle)
                item.click(handle);

            this.element.append(item);
        }
    }

    class SXMediaGalleryPanel {
        constructor(options) {
            this._prefix = pluginPrefix + "-panel";
            this._defaults = {};
            this._options = extendDefaults(this._defaults, options);

            this._element = $(`<div class='${this._prefix}'></div>`).css('display', 'none');

            this._isVisible = false;
            this._materials = [];

            this._menu = new SXMediaGalleryMenu();
            this._desk = new SXMediaGalleryDesk();

            this.menu.addButton(SXMediaGalleryButton.create('desk', IconCollection.Menu, this.displayDesk.bind(this)));
            this.menu.addButton(SXMediaGalleryButton.create('info', IconCollection.Profile, this.toggleInfo.bind(this)));
            this.menu.addButton(SXMediaGalleryButton.create('download', IconCollection.Download, this.download.bind(this)));
            this.menu.addButton(SXMediaGalleryButton.create('close', IconCollection.Close, this.close.bind(this)));
        }

        get element() {
            return this._element == undefined ? null : this._element;
        }

        get isVisible() {
            return this._isVisible == undefined || this._isVisible == null ? false : this._isVisible;
        }

        get menu() {
            return this._menu == undefined ? null : this._menu;
        }

        get desk() {
            return this._desk == undefined ? null : this._desk;
        }

        get materials() {
            if (this._materials == undefined || this._materials == null || !(this._materials instanceof Array))
                this._materials = [];

            return this._materials;
        }

        //get Count of Materials in Collection
        get count() {
            return this.materials.length;
        }

        //get index of current Material in Materials Collection
        get index() {
            if (this.collection == null || this.material == null)
                return -1;
            return this.collection.indexOf(this.material);
        }

        display(visible) {
            if (visible == undefined || visible) {
                this._isVisible = true;
                this.element.show();
            }
            else {
                this._isVisible = false;
                this.element.hide();
            }
        }

        hide() {
            this.display(false);
        }

        show() {
            this.display(true);
        }

        toggle() {
            this.display(!this.isVisible);
        }

        //add object(objects) to Materials Collection
        addMaterial(obj) {
            if (obj == null || obj == undefined)
                return;
            else if (obj instanceof SXMediaMaterial) {
                if (this.findMaterial(obj.url) == null)
                    this.materials.push(obj);
            }
            else if (obj instanceof Array) {
                for (let i = 0; i < obj.length; i++)
                    this.addMaterial(obj[i]);
            }
            else if (typeof obj == 'object') {
                this.addMaterial(new SXMediaMaterial(obj));
            }
        }

        //find Material in Collection by URL
        findMaterial(url) {
            if (url == null || url == undefined || typeof url != 'string' || url == '')
                return null;

            for (let i = 0; i < this.count; i++)
                if (this.materials[i].url.toLowerCase() == url.toLowerCase())
                    return this.collection[i];

            return null;
        }
    }

    class SXMediaGallery {

        constructor(element, options) {
            this._prefix = pluginPrefix;
            this._defaults = {infoVisible: true};
            this._options = $.extend({}, this._defaults, options);

            this._element = element;
            this._panel = null;
            this._viewer = null;
            this._menu = null;
            this._desk = null;

            this._collection = [];

            this.init();
        }

        get panel() {
            return this._panel == undefined ? null : this._panel;
        }

        get viewer() {
            return this._viewer == undefined ? null : this._viewer;
        }

        get desk() {
            return this._desk == undefined ? null : this._desk;
        }

        get collection() {
            if (this._collection == null || this._collection == undefined || !(this._collection instanceof Array))
                return null;
            return this._collection;
        }

        //get current Material object
        get material() {
            return this.viewer == null ? null : this.viewer.material;
        }

        //set current Material object
        set material(obj) {
            let material = null;

            if (obj == null || obj == undefined)
                material = null;
            else if (typeof obj == 'string')
                material = this.findMaterial(obj);
            else if (obj instanceof SXMediaMaterial)
                material = obj;
            else if (typeof obj == 'object')
                material = new SXMediaMaterial(obj);
            else
                throw new Error('Invalid Material specified!');

            if (this.viewer != null)
                this.viewer.material = material;
        }

        //get Count of Materials in Collection
        get count() {
            return this.collection == null ? 0 : this.collection.length;
        }

        //get index of current Material in Materials Collection
        get index() {
            if (this.collection == null || this.material == null)
                return -1;
            return this.collection.indexOf(this.material);
        }

        //initialize Media Gallery with Data, DOM elements and events
        init() {
            //добавляем все HTML элементы в коллекцию материалов
            $(`.${this._prefix}-item`).each(function (index, element) {
                let url = $(element).data('url');
                let date = $(element).data('date');
                let title = $(element).data('title');
                let comment = $(element).data('comment');
                this.addMaterial(new SXMediaMaterial({url: url, date: date, title: title, comment: comment}));
            }.bind(this));

            // добавляем новую панель к документу
            $("body").append(this._createPanel());

            // при нажатии на элемент нужно отобразить панель с этим элементом
            $(this._element).on('click', `.${this._prefix}-item`, function (event) {
                let item = $(event.target);
                this.show(item.data('url'));
                event.stopPropagation();
            }.bind(this));

            // при нажатии на документ вне панели - нужно закрыть панель
            $(document).click(this.close.bind(this));

            // on Window resize we should resize our Gallery
            $(window).resize(this.resize.bind(this));
        }

        //display panel of Gallery
        show(material) {
            if (material != undefined)
                this.displayMaterial(material);

            this.panel.show();
        }

        //close panel of Gallery
        close() {
            if (this.viewer != null)
                this.viewer.clear();
            this.panel.hide();
        }

        moveTo(index) {
            let count = this.count;
            if (count <= 0)
                return;

            if (index >= count)
                index = count - 1;
            if (index < 0)
                index = 0;

            this.displayMaterial(this.collection[index]);
        }

        moveNext() {
            this.moveTo(this.index + 1);
        }

        movePrevious() {
            this.moveTo(this.index - 1);
        }

        downloadMaterial() {
            if (this.viewer != null && this.viewer.material != null) {
                this.viewer.download();
            }
        }

        //add object(objects) to Materials Collection
        addMaterial(obj) {
            if (obj == null || obj == undefined)
                return;

            if (obj instanceof SXMediaMaterial) {
                //if (this.findMaterial(obj.url) == null)
                this.collection.push(obj);
            }
            else if (obj instanceof Array) {
                for (let i = 0; i < obj.length; i++)
                    this.addMaterial(obj[i]);
            }
            else if (typeof obj == 'object') {
                this.addMaterial(new SXMediaMaterial(obj));
            }
        }

        //find Material in Collection by URL
        findMaterial(url) {
            if (url == null || url == undefined || typeof url != 'string' || url == '')
                return null;

            for (let i = 0; i < this.count; i++)
                if (this.collection[i].url.toLowerCase() == url.toLowerCase())
                    return this.collection[i];

            return null;
        }

        //resize the Gallery
        resize() {
            if (this.panel != null && this.viewer != null)
                this.viewer.resize(this.panel.width(), this.panel.height());
        }

        //display specific Material in panel
        displayMaterial(material) {
            this.material = material;
            if (this.viewer != null)
                this.viewer.displayMaterial();
            this.displayDesk(false);
        }

        //display Material's Info
        displayInfo(visible) {
            if (this.viewer != null) {
                this.viewer.displayInfo(visible);

                if (this.viewer.infoVisible)
                    this.panel.find(`.${this._prefix}-menu-button-info`).addClass('active');
                else
                    this.panel.find(`.${this._prefix}-menu-button-info`).removeClass('active');
            }
        }

        //toggle Material's Info visibility
        toggleInfo() {
            if (this.viewer != null) {
                this.displayInfo(!this.viewer.infoVisible);
            }
        }

        displayDesk(visible) {
            if (visible == undefined)
                visible = true;

            if (this.desk == null)
                return;

            if (visible) {
                this.desk.isVisible = true;
                this.desk.show();
                this.panel.find(`.${this._prefix}-menu-button-desk`).addClass('active');
            }
            else {
                this.desk.isVisible = false;
                this.desk.hide();
                this.panel.find(`.${this._prefix}-menu-button-desk`).removeClass('active');
            }
        }

        toggleDesk() {
            if (this.desk != null)
                this.displayDesk(!this.desk.isVisible);
        }


        //создает элемент панели (для отображения увеличенных изображений)
        _createPanel() {
            let prefix = this._prefix;

            let _createArrow = function (name, handler) {
                let arrow = $(`<div class='${prefix}-panel-arrow ${prefix}-panel-arrow-${name} unselectable'></div>`);
                arrow.append($(`<img src='${name == 'left' ? IconCollection.ArrowLeft : IconCollection.ArrowRight}'>`));
                arrow.on('click', handler);
                return arrow;
            }.bind(this);

            let _createMenuButton = function (name, src, handler) {
                let button = $(`<a class='${prefix}-menu-button ${prefix}-menu-button-${name} unselectable'></a>`);
                button.append($(`<img ${(src == undefined || src == null || src == '') ? '' : `src=${src}`}>`));
                button.click(handler);
                return button;

            }.bind(this);

            let _createMenu = function () {
                let menu = $(`<div class='${prefix}-menu'></div>`);
                menu.append(_createMenuButton('desk', IconCollection.Menu, this.toggleDesk.bind(this)));
                menu.append(_createMenuButton('info', IconCollection.Profile, this.toggleInfo.bind(this)));
                menu.append(_createMenuButton('download', IconCollection.Download, this.downloadMaterial.bind(this)));
                menu.append(_createMenuButton('close', IconCollection.Close, this.close.bind(this)));
                return menu;
            }.bind(this);

            let _createDesk = function () {
                let desk = $(`<div class='${prefix}-desk'></div>`).css('display', 'none');
                for (let i = 0; i < this.count; i++) {
                    let material = this.collection[i];
                    let item = $(`<div class='${prefix}-desk-item'><img class='${prefix}-desk-item-avatar' src='${material.avatar}'></div>`);
                    item.click(function (event) {
                        this.displayMaterial(material);
                        event.stopPropagation();
                    }.bind(this));
                    desk.append(item);
                }
                return desk;
            }.bind(this);


            this._panel = $(`<div class='${prefix}-panel'></div>`).css('display', 'none');
            this._panel.ready(this.resize.bind(this));
            this._panel.click(function (event) {
                event.stopPropagation();
            });
            this._panel.on('swiperight', this.movePrevious.bind(this));
            this._panel.on('swipeleft', this.moveNext.bind(this));

            this._panel.append(_createArrow('left', this.movePrevious.bind(this)));
            this._panel.append(_createArrow('right', this.moveNext.bind(this)));

            this._panel.append(_createMenu());

            this._desk = _createDesk();
            this._panel.append(this._desk);

            // создаем просмотрщик
            this._viewer = SXMediaGalleryViewer.create({
                width: this._panel.width(),
                height: this._panel.height(),
                infoVisible: this._options.infoVisible
            });

            // добавляем просмотрщик к панели
            if (this.viewer != null && this.viewer.element != null)
                this._panel.append(this.viewer.element);

            // подсветить кнопку инфы, если необходимо
            if (this.viewer.infoVisible)
                this._panel.find(`.${prefix}-menu-button-info`).addClass('active');

            // left arrow for previous Material
            //let arrowLeft = $(`<div class='${this._prefix}-panel-arrow ${this._prefix}-panel-arrow-left unselectable'><img src='${IconCollection.ArrowLeft}'></div>`);
            //arrowLeft.on('click', this.movePrevious.bind(this));
            //panel.append(arrowLeft);

            // right arrow for next Material
            //let arrowRight = $(`<div class='${this._prefix}-panel-arrow ${this._prefix}-panel-arrow-right unselectable'><img src='${IconCollection.ArrowRight}'></div>`);
            //arrowRight.on('click', this.moveNext.bind(this));
            //panel.append(arrowRight);

            return this._panel;
        }

        //создает элемент меню с кнопками
        //_createMenu() {
        //    let menu = $(`<div class='${pluginPrefix}-menu'></div>`);
        //
        //    menu.append(this._createMenuButton('collection', IconCollection.Menu, this.showCollection));
        //    let buttonInfo = this._createMenuButton('info', IconCollection.Profile, this.toggleInfo);
        //    if (this._options.infoVisible)
        //        buttonInfo.addClass('active');
        //    menu.append(buttonInfo);
        //    menu.append(this._createMenuButton('download', IconCollection.Download, this.download));
        //    menu.append(this._createMenuButton('close', IconCollection.Close, this.close));
        //
        //    return menu;
        //}

        //создает элемент кнопки
        //_createMenuButton(name, src, onClick) {
        //    let button = $(`<a class='${pluginPrefix}-button ${pluginPrefix}-button-${name} unselectable'></a>`);
        //
        //    let imgSrc = (src == undefined || src == null || src == '') ? '' : `src=${src}`;
        //    button.append($(`<img ${imgSrc}>`));
        //
        //    if (onClick)
        //        button.on('click', function (event) {
        //            onClick.apply(this);
        //        }.bind(this));
        //
        //    return button;
        //}
    }


    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new SXMediaGallery(this, options));
            }
        });
    }

})(jQuery, window, document);