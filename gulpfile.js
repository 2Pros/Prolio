var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass'])
});

gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('app/dist/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('default', ['scripts', 'sass', 'watch']);