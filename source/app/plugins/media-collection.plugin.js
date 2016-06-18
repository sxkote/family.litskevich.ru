'use strict';

class MediaCollection {

    // Define option defaults
    const _defaults = {
        className: 'fade-and-drop'
    };


    constructor(opts) {
        this.options = this._defaults;

        //this.

        // Create options by extending defaults with the passed in arugments
        if (opts && typeof opts === "object") {
            this.options = this._extendDefaults(opts);
        }
    }

    _extendDefaults(properties, source) {
        if (source == null || source == undefined)
            source = this._defaults;

        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}