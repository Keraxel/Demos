const gulp = require('gulp'),
    config = require('./gulp.config.js')(),
    secrets = require('./secrets.json'),
    through = require('through'),
    $ = require('gulp-load-plugins')();

gulp.task('default', ['build']);
gulp.task('build', ['build:less']);

gulp.task('watch', ['build'], () => {
    gulp.watch(config.lessBuildFiles, ['build:less']);
});

gulp.task('lint:less', () => {
        return gulp.src(config.lessBuildFiles)
            .pipe($.lesshint())
            .pipe($.lesshint.reporter())
            .pipe(lesshintErrorReporter());
    });

gulp.task('build:less', ['lint:less'], () => {
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

function lesshintErrorReporter() {
    var errorOccured = false;

    return through(
        function throughWrite(file) {
            if (file.lesshint.resultCount > 0) {
                errorOccured = true;
            }
        },
        function throughEnd() {
            if (errorOccured) {
                this.emit('error', new $.util.PluginError('gulp-lesshint', {
                    message: 'An error occured during linting.',
                    showStack: false
                }));
            } else {
                this.emit('end');
            }
        }
    );
}
