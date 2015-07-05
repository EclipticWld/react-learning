var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    stylus = require('gulp-stylus'),
    insert = require('gulp-insert'),
    autoprefixer = require('gulp-autoprefixer'),
    reload = browserSync.reload;

var nameFolder = '4-example';

// links in project
var path = {
    app: {
        stylus: nameFolder + '/app/'
    },
    src: {
        html: nameFolder + '/app/*.html',
        stylus: nameFolder + '/app/*.styl',
        js: nameFolder +  '/app/*.jsx'
    },
    watch: {
        html: nameFolder + '/app/*.html',
        stylus: nameFolder + '/app/*.styl',
        js: nameFolder + '/app/*.js'
    }
};

// Server configuration
var serverConfig = {
    server: {baseDir: nameFolder + "/app"},
    watchOptions: {debounceDelay: 1000},
    tunnel: false,
    host: 'localhost',
    port: 3003,
    logPrefix: "NHK_Says:"
};

// Run web server
gulp.task('serve', function () {
    browserSync.init(serverConfig);
});

// dev reload
gulp.task('html:app', function () {
    gulp.src(path.src.html)
        .pipe(reload({stream:true}));
});
gulp.task('stylus:app', function() {
    gulp.src(path.src.stylus)
        .pipe(stylus({compress: false}))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(gulp.dest(path.app.stylus))
        .pipe(reload({stream:true}));
});
gulp.task('js:app', function () {
    gulp.src(path.src.js)
        .pipe(reload({stream:true}));
});

gulp.task('dev', ['html:app', 'stylus:app', 'js:app']);

gulp.task('watch', function () {
    gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:app');
    });
    gulp.watch([path.watch.stylus], function(event, cb) {
        gulp.start('stylus:app');
    });
    gulp.watch([path.watch.js], function(event, cb) {
        gulp.start('js:app');
    });
});

gulp.task('default', ['dev', 'serve', 'watch']);