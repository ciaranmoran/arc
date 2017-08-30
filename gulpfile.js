// require gulp
const gulp = require('gulp');

// require plugins
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

// js task
gulp.task('js', () => {
    const out =
        gulp
            .src('./js/src/**/*.js')
            .pipe(
                uglify().on('error', (err) => {
                    console.log('Uglify error:', err);
                    this.emit('end');
                }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./js/dist/'));
    return out;
});

// styles task
gulp.task('styles', () => {
    const out =
        gulp
            .src('./sass/**/*.scss')
            .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('./css/'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./css/'));

    return out;
});

// default task
gulp.task('default', ['js', 'styles']);

// watch task
gulp.task('watch', ['js', 'styles'], () => {
    gulp.watch('./js/src/**/*.js', ['js']);
    gulp.watch('./sass/*.scss', ['styles']);
});
