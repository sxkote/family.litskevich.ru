var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var flatten = require('gulp-flatten');
var useref = require('gulp-useref');
var cleanCss = require('gulp-clean-css');
var gulpif = require('gulp-if');
var debug = require('gulp-debug');
var sequence = require('gulp-sequence');
var del = require('del');

var dest = './www';

var paths = {
    source: {
        base: './source/',
        lib: './source/lib/',
        html: './source/*.html',
        sass: [
            './source/css/*.scss'
        ],
        images: [
            './source/images/**/*'
        ],
        fonts: [
            './source/lib/mdi/fonts/**/*'
        ],
        materials: [
            './source/app/views/**/*',
            './source/app/partials/**/*',
            './source/web.config'
        ]
    },
    output: {
        base: './www/',
        app: './www/app/',
        css: './www/css/',
        fonts: './www/fonts/',
        images: './www/images/',
        js: './www/js/'
    },
    bower: {
        path: './bower.json',
        overrides: {
            "bootstrap": {main: ['./dist/js/*.min.js', './dist/css/*.min.css', './dist/fonts/*.*']},
            "angular": {main: ['./angular.min.js']},
            "angular-route": {main: ['./angular-route.min.js']},
            "angular-local-storage": {main: ['./dist/angular-local-storage.min.js']}
        },
        extras: ['./bower_components/_extras/**']
    }
};

gulp.task('sass', function () {
    return gulp.src(paths.input.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.output.css));
});

gulp.task('clean', function () {
    return del(paths.output.base);
});

gulp.task('lib.clean', function () {
    return del(paths.source.lib);
});

gulp.task('lib.vendor', function () {
    //var filterJS = gulpFilter('**/*.js', {restore: true});
    return gulp.src(paths.bower.path)
        .pipe(mainBowerFiles({overrides: paths.bower.overrides}))
        //.pipe(filterJS)
        //.pipe(uglify())
        //.pipe(filterJS.restore)
        //.pipe(gulpif(['**/*.js', '!**/*.min.js'], uglify()))
        .pipe(flatten({includeParents: [1, 1]}))
        .pipe(gulp.dest(paths.source.lib));
});

gulp.task('lib.extras', function () {
    return gulp.src(paths.bower.extras)
        .pipe(gulp.dest(paths.source.lib));
});

gulp.task('lib', sequence('lib.clean', ['lib.vendor', 'lib.extras']));

//gulp.task('temp.customJS', function () {
//    // SX Media Gallery
//    return gulp.src(paths.input.customjs.sxMediaGallery)
//        //.pipe(sourcemaps.init())
//        .pipe(babel({presets: ['es2015']}))
//        .pipe(concat('sx-media-gallery.js'))
//        //.pipe(gulp.dest(paths.output.js)) // save .js
//        .pipe(uglify({preserveComments: 'license'}))
//        .pipe(rename({extname: '.min.js'}))
//        //.pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest(paths.output.js)); // save .min.js
//});

//gulp.task('temp.build', ['clean', 'sass', 'customJS'], function () {
//
//    //Fonts files
//    gulp.src(paths.input.fonts).pipe(gulp.dest(paths.output.fonts));
//
//    // Images files
//    gulp.src(paths.input.images).pipe(gulp.dest(paths.output.images));
//
//    // CSS files
//    gulp.src(paths.input.css).pipe(gulp.dest(paths.output.css));
//
//    // JavaScript files
//    gulp.src(paths.input.js).pipe(gulp.dest(paths.output.js));
//
//    // App (Angular) files
//    var appPath = paths.output.app;
//
//    gulp.src(paths.input.app.html).pipe(gulp.dest(appPath));
//    gulp.src(paths.input.app.js)
//        .pipe(sourcemaps.init())
//        .pipe(babel({presets: ['es2015']}))
//        .pipe(concat('app.js'))
//        .pipe(gulp.dest(appPath)) // save .js
//        .pipe(uglify({preserveComments: 'license'}))
//        .pipe(rename({extname: '.min.js'}))
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest(appPath)); // save .min.js
//});


gulp.task('useref', function () {
    return gulp.src(paths.source.html)
        .pipe(useref())
        .pipe(debug({title: 'useref:'}))
        .pipe(gulpif(['**/*.js', '!**/*.min.js'], debug({title: 'useref js:'})))
        .pipe(gulpif(['**/*.js', '!**/*.min.js'], babel({presets: ['es2015'], compact: false})))
        .pipe(gulpif(['**/*.js', '!**/*.min.js'], uglify()))
        .pipe(gulpif(['**/*.css', '!**/*.min.css'], cleanCss()))
        .pipe(gulp.dest(paths.output.base));
});

gulp.task('images', function () {
    return gulp.src(paths.source.images, {base: paths.source.base})
        .pipe(gulp.dest(paths.output.base));
});

gulp.task('fonts', function () {
    return gulp.src(paths.source.fonts)
        .pipe(gulp.dest(paths.output.fonts));
});

gulp.task('materials', function () {
    return gulp.src(paths.source.materials, {base: paths.source.base})
        .pipe(gulp.dest(paths.output.base));
});

gulp.task('build', sequence('clean', ['useref', 'fonts', 'images', 'materials']));

//Watch task
gulp.task('default', ['build']);