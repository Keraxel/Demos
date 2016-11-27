const gulp = require('gulp'),
    config = require('./gulp.config.js')(),
    secrets = require('./secrets.json'),
    $ = require('gulp-load-plugins')();

gulp.task('default', ['build']);
gulp.task('build', ['build:less']);

gulp.task('watch', ['build'], () => {
    gulp.watch(config.lessBuildFiles, ['build:less']);
});

gulp.task('build:less', () => {
    return gulp.src(config.lessBuildFiles)
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: ["last 2 version"]
        }))
        .pipe($.concat('main.css'))
        .pipe(gulp.dest(config.buildCssPath))
        .pipe($.concat('main.min.css'))
        .pipe($.cleanCss())
        .pipe(gulp.dest(config.buildCssPath));
});
