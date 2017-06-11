var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

const sassFiles = "sass/*.scss";
gulp.task("sass", function(){
    gulp.src(sassFiles)
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9", ""))
        .pipe(gulp.dest('css'));
});

gulp.src(['js/*.js', '!js/*.min.js'])

gulp.task('uglify', function() {
    gulp.src(['./js/*.js', '!./js/*.min.js'])
        .pipe(uglify('script.min.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./sass/*.scss','./css/style.css', './js/*.js', '!./js/*.min.js'], ['sass', 'uglify']);
    gulp.watch(['./css/style.css', './js/*.js'], function(files) {
        livereload.changed(files)
    });
});

gulp.task('build', ['sass', 'uglify']);