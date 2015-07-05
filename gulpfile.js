var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
    return gulp.src('assets/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('assets/dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src('assets/img/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, })))
        .pipe(gulp.dest('assets/dist/img'))
        .pipe(notify({ message: 'Images task complete'}));
});

gulp.task('clean', function(cb) {
    del(['assets/dist/css', 'assets/dist/js', 'assets/dist/img'], cb);
});

gulp.task('clearCache', function() {
    cache.clearAll();
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
    gulp.watch('assets/styles/*.scss', ['styles']);
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch('assets/img/*', ['images']);
});

