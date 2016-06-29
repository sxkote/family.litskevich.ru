var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var del = require('del');

var dest = './www';

var paths = {
    clean: [
        './www/app',
        './www/css',
        './www/fonts',
        './www/images',
        './www/js'
    ],
    input: {
        sass: ['./source/sass/*.scss'],
        css: [
            './source/lib/material-design-iconic-font/css/material-design-iconic-font.min.css',
            './source/lib/bootstrap/dist/css/bootstrap.min.css',
            './source/lib/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
            './source/lib/bootstrap-material-design/dist/css/ripples.min.css',
            './source/lib/mdi/css/materialdesignicons.min.css',
            './source/lib/ng-img-crop/compile/minified/ng-img-crop.css',
            './source/lib/snackbarjs/dist/snackbar.min.css',
            './source/lib/sx-media-gallery/dist/css/sx-media-gallery.css',
            './source/sass/*.css'
        ],
        js: [
            './source/lib/jquery/dist/jquery.min.js',
            './source/lib/bootstrap/dist/js/bootstrap.min.js',
            './source/lib/bootstrap-material-design/dist/js/material.min.js',
            './source/lib/bootstrap-material-design/dist/js/ripples.min.js',
            './source/lib/arrive/minified/arrive.min.js',
            './source/lib/snackbarjs/dist/snackbar.min.js',
            './source/lib/flow.js/dist/flow.min.js',
            './source/lib/angular/angular.min.js',
            './source/lib/angular-route/angular-route.min.js',
            './source/lib/angular-local-storage/dist/angular-local-storage.min.js',
            './source/lib/ng-img-crop/compile/minified/ng-img-crop.js',
            './source/lib/ng-flow/dist/ng-flow.min.js',
            './source/lib/sx-media-gallery/dist/js/pdfobject.min.js'
        ],
        customjs: {
            sxMediaGallery: [
                './source/lib/sx-media-gallery/dist/js/jquery.event.move.js',
                './source/lib/sx-media-gallery/dist/js/jquery.event.swipe.js',
                './source/lib/sx-media-gallery/dist/js/sx-media-gallery.js'
            ]
        },
        fonts: [
            './source/lib/material-design-iconic-font/fonts/**',
            './source/lib/mdi/fonts/**'
        ],
        images: ['./source/images/**'],
        app: {
            all: ['./source/app/**'],
            js: ['./source/app/**/*.js', '!./source/app/test.app.js'],
            html: ['./source/app/**/*.html']
        }
    },
    output: {
        app: './www/app/',
        css: './www/css/',
        fonts: './www/fonts/',
        images: './www/images/',
        js: './www/js/'
    }
};

gulp.task('sass', function () {
    gulp.src(paths.input.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.output.css));
});

gulp.task('clean', function () {
    // delete OLD files
    del(paths.clean);
});

gulp.task('customJS', function(){
    // SX Media Gallery
    gulp.src(paths.input.customjs.sxMediaGallery)
        //.pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('sx-media-gallery.js'))
        //.pipe(gulp.dest(paths.output.js)) // save .js
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(rename({extname: '.min.js'}))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.output.js)); // save .min.js
});

gulp.task('build', ['clean', 'sass', 'customJS'], function () {

    del(paths.clean);

    //Fonts files
    gulp.src(paths.input.fonts).pipe(gulp.dest(paths.output.fonts));

    // Images files
    gulp.src(paths.input.images).pipe(gulp.dest(paths.output.images));

    // CSS files
    gulp.src(paths.input.css).pipe(gulp.dest(paths.output.css));

    // JavaScript files
    gulp.src(paths.input.js).pipe(gulp.dest(paths.output.js));

    // App (Angular) files
    var appPath = paths.output.app;

    gulp.src(paths.input.app.html).pipe(gulp.dest(appPath));
    gulp.src(paths.input.app.js)
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(appPath)) // save .js
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(rename({extname: '.min.js'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appPath)); // save .min.js
});

//Watch task
gulp.task('default', ['build']);