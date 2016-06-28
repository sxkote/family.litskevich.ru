var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

var dest = './www';


gulp.task('sass', function() {
    gulp.src('source/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dest + '/css'));
});

gulp.task('delete', function(){
    // delete OLD files
    del([dest + '/images/*', dest + '/css/*', dest + '/fonts/*', dest + '/js/*', dest + '/data/*']);
});

gulp.task('copy', function() {

    // delete OLD files
    del([dest + '/images/*', dest + '/css/*', dest + '/fonts/*', dest + '/js/*', dest + '/data/*']);

    //Fonts files
    gulp.src('./source/lib/material-design-iconic-font/fonts/**').pipe(gulp.dest(dest + '/fonts'));
    gulp.src('./source/lib/mdi/fonts/**').pipe(gulp.dest(dest + '/fonts'));


    // CSS files
    gulp.src('./source/lib/material-design-iconic-font/css/material-design-iconic-font.min.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/bootstrap-material-design/dist/css/bootstrap-material-design.min.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/bootstrap-material-design/dist/css/ripples.min.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/mdi/css/materialdesignicons.min.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/ng-img-crop/compile/minified/ng-img-crop.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/snackbarjs/dist/snackbar.min.css').pipe(gulp.dest(dest + '/css'));
    gulp.src('./source/lib/sx-media-gallery/dist/css/sx-media-gallery.css').pipe(gulp.dest(dest + '/css'));


    // JavaScript files
    gulp.src('./src/js/*.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/jquery/dist/jquery.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/bootstrap-material-design/dist/js/material.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/bootstrap-material-design/dist/js/ripples.min.js').pipe(gulp.dest(dest + '/js'));
    //gulp.src('./source/lib/mdb/js/mdb.min.js').pipe(gulp.dest(dest + '/js'));
    //gulp.src('./source/lib/mdb/js/tether.min.js').pipe(gulp.dest(dest + '/js'));
    //gulp.src('./lib/remarkable/dist/remarkable.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/momentjs/min/moment.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/momentjs/min/moment-with-locales.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/arrive/minified/arrive.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/snackbarjs/dist/snackbar.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/flow.js/dist/flow.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/sx-media-gallery/dist/js/.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/sx-media-gallery/dist/js/jquery.event.move.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/sx-media-gallery/dist/js/jquery.event.swipe.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/sx-media-gallery/dist/js/pdfobject.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/sx-media-gallery/dist/js/sx-media-gallery.js').pipe(gulp.dest(dest + '/js'));

    gulp.src('./source/lib/angular/angular.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/angular-route/angular-route.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/angular-local-storage/dist/angular-local-storage.min.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/ng-img-crop/compile/minified/ng-img-crop.js').pipe(gulp.dest(dest + '/js'));
    gulp.src('./source/lib/ng-flow/dist/ng-flow.min.js').pipe(gulp.dest(dest + '/js'));


    // Images files
    gulp.src('./source/images/**').pipe(gulp.dest(dest + '/images'));

    // App (Angular) files
    gulp.src('./source/app/**').pipe(gulp.dest(dest + '/app'));

    // Data files
    gulp.src('./source/data/**').pipe(gulp.dest(dest + '/data'));

    // Web.Config
    gulp.src('./source/web.config').pipe(gulp.dest(dest + '/'));

});

//Watch task
gulp.task('default', ['sass','copy'], function() {
    //gulp.watch('sass/**/*.scss',['sass']);
});